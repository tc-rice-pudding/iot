<template>
  <div ref="tableContainer" style="height: 100%">
    <el-table
      ref="commonTable"
      v-loading="listLoading"
      :data="showData"
      :max-height="maxHeight"
      :height="tableHeight"
      tooltip-effect="dark"
      header-row-class-name="table-header"
      row-class-name="row-class-name"
      :span-method="objectSpanMethod"
      :class="`common-table ${pageSize >= 20 ? 'page20' : ''}`"
      :cell-style="cellStyle"
      :cell-class-name="cellClassName"
      @row-click="rowClick"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @sort-change="sortChange"
      @selection-change="selectionChange"
      :row-key="row => row.resourceId"
      :border="true"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="showSelection"
        class-name="columnFilter"
        type="selection"
        align="center"
        width="50"
        :reserve-selection="true"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showIndex"
        class-name="columnFilter"
        type="index"
        width="50"
        align="center"
        label="序号"
        :index="setIndex"
      ></el-table-column>
      <!-- 其他列数据 -->
      <el-table-column
        v-for="item in columns"
        :key="item.id"
        :prop="item.prop"
        :align="item.align || 'center'"
        :label="item.label || ''"
        :width="item.width || ''"
        :sortable="item.sortable || false"
        :show-overflow-tooltip="item.showTooltip || false"
        :resizable="true"
        :formatter="formatterData"
        :type="item.slot"
      >
        <!-- 渲染 多行表头 -->
        <template v-slot v-if="item.children">
          <el-table-column
            v-for="(child, childIdx) in item.children || []"
            :key="childIdx"
            :prop="child.prop"
            :align="child.align || 'center'"
            :label="child.label || ''"
            :width="child.width || ''"
            :sortable="child.sortable || false"
            :show-overflow-tooltip="child.showTooltip || false"
            :resizable="true"
            :formatter="formatterData"
            :type="child.slot"
          ></el-table-column>
        </template>

        <!-- 操作 -->
        <template v-slot="{ row }" v-else-if="item.opera">
          <el-button
            @click="onRowView(row, item.opera)"
            type="text"
            size="small"
          >{{ item.opera.label }}</el-button>
        </template>

        <!-- 渲染input、select等组件 -->
        <template v-slot="scope" v-else-if="item.slot">
          <el-input v-if="item.slot === 'input'" size="mini" v-model="scope.row[item.prop]" />
          <el-checkbox v-else-if="item.slot === 'checkbox'" v-model="scope.row[item.prop]" />
          <el-select
            v-else-if="item.slot === 'select'"
            size="mini"
            v-model="scope.row[item.prop]"
            placeholder="请选择"
          >
            <el-option
              v-for="(op, idx) in item.options"
              :key="idx"
              :label="op.label"
              :value="op.value"
            ></el-option>
          </el-select>
          <div
            v-if="item.slot === 'expand'"
            style="max-height: 200px; padding: 10px 20px; overflow-y: auto"
          >
            <!-- <ul class="expanBox" v-if="scope.row[item.prop].length > 0">
              <li v-for="item in scope.row[item.prop].split(',')" :key="item">{{ item }}</li>
            </ul>-->
            <el-card v-for="item in scope.row[item.prop].split(',')" :key="item">
              <p>{{ item }}</p>
            </el-card>
            <div v-if="scope.row[item.prop].length <= 0">暂无数据</div>
          </div>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <slot />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="showPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="table-page"
    ></el-pagination>
  </div>
</template>

<script>
import { deepClonePlus, uuid } from '@/utils/tool';

export default {
  name: 'CommonTable',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    dealListData: {
      type: Function,
    },
    diyColumnSort: {
      type: Function,
    },
    maxHeight: {
      type: Number,
    },
    cellStyleFn: {
      type: Function,
    },
    formatterData: {
      type: Function,
      default: (row, column, cellValue, index) => {
        return cellValue;
      },
    },
    cellClassName: {
      type: Function,
    },
    objectSpanMethod: {
      type: Function,
    },
  },
  data() {
    return {
      tableHeight: '500',
      autoDealData: this.config.autoDealData || false, // 是否自动处理数据(前端分页)
      allData: deepClonePlus(this.config.data || []), // autoDealData为true时设置; 列表所有数据(前端分页)
      showData: [], // 当前页显示的数据
      showSelection: this.config.showSelection || false, // 复选
      showIndex: this.config.showIndex || false, // 序号
      total: (this.config.data || []).length || 1000, // 总数
      currentPage:  1, // 当前页
      pageSize:  100, // 页数 :资源信息默认都是100
      columns: this.config.columns || [], // 列数据
      sortObj: {}, // 排序值
      listLoading: true, // 列表加载loading
      currSelectData: deepClonePlus(this.config.selectData || []), // 当前选中数据
      showPagination: this.config.showPagination === undefined ? true : this.config.showPagination,
      sortable: null,
    };
  },
  mounted() {
    if (this.autoDealData) {
      this.dealShowData(this.allData);
      this.listLoading = false;
    } else {
      this.listLoading = true;
      this.refreshTableData();
    }
    this.setContainerHeight();
  },
  methods: {
    onRowView(row, opera) {
      this.$emit(`${opera.operation}`, row);
    },
    setColumnsList(list) {
      this.columns = deepClonePlus(list).filter(it => {
        return (it.id = `${it.id}-${Math.random() * 10}`);
      });
    },
    // 刷新列表数据，向父组件取数据重新渲染
    refreshTableData(initPage) {
      this.listLoading = true;
      let page = this.currentPage;
      if (initPage) {
        this.currentPage = initPage;
        page = initPage;
      }
      this.dealListData(page, this.pageSize, this.sortObj).then(
        result => {
          this.showData = result.data;
          this.total = result.total;
          this.listLoading = false;
        },
        error => {
          this.$message({
            type: 'error',
            showClose: true,
            message: error.message,
          });
          console.log(error);
          this.showData = [];
          this.total = 0;
          this.listLoading = false;
        }
      );
    },
    /* 渲染数据 前端分页 */
    dealShowData(allData) {
      if (undefined === allData) {
        return;
      }
      let start = (this.currentPage - 1) * this.pageSize;
      var end = this.currentPage * this.pageSize;
      let tempData = allData.slice(start, end);

      this.showData = [];
      this.total = allData.length;
      for (let i in tempData) {
        if (tempData[i]) {
          tempData[i]._checked = false;
          this.showData.push(tempData[i]);
        }
      }

      // 设置当前选中
      if (this.currSelectData) {
        let tempArr = this.currSelectData;
        for (let i1 in tempArr) {
          for (let j1 in this.showData) {
            if (this.showData[j1].id === tempArr[i1].id) {
              this.showData[j1]._checked = true;
              break;
            }
          }
        }
      }
    },
    sortChange(column) {
      const { prop, order } = column;
      this.sortObj = {
        prop,
        order,
      };
      if (!this.autoDealData) {
        this.listLoading = true;
        this.refreshTableData();
      }
    },
    rowClick(row, column, event) {
      this.$refs.commonTable?.toggleRowSelection(row);
      this.$emit('row-click', row, column, event);
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cellMouseEnter', row, column, cell, event);
    },
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cellMouseLeave', row, column, cell, event);
    },
    cellClick(row, column, cell, event) {
      this.$emit('cellClick', row, column, cell, event);
    },
    selectionChange(selection) {
      this.currSelectData = selection;
      this.$emit('on-selection-change', this.currSelectData);
    },
    handleSizeChange(val) {
      this.setContainerHeight();
      this.pageSize = val;
      if (this.autoDealData) {
        this.dealShowData(this.allData);
      } else {
        this.listLoading = true;
        this.refreshTableData();
      }
    },
    handleCurrentChange(index) {
      this.currentPage = index;
      if (this.autoDealData) {
        this.dealShowData(this.allData);
      } else {
        this.listLoading = true;
        this.refreshTableData();
      }
    },
    cellStyle(data) {
      return this.cellStyleFn(data);
    },
    // 设置表格高度
    setContainerHeight() {
      const containerRef = this.$refs.tableContainer;
      if (containerRef) {
        setTimeout(() => {
          const containerHei = containerRef.clientHeight - 32; // 减去分页的高度
          // console.log('handleSizeChange =>', containerHei);
          this.tableHeight = `${containerHei}`;
        }, 100);
      }
    },
    // 设置索引，从 0 开始
    setIndex(index) {
      return index + 1 + this.pageSize * (this.currentPage - 1);
    },
  },
};
</script>
<style lang="less" scoped>
.table-page {
  display: flex;
  justify-content: flex-end;
}

.common-table.page20 {
  height: calc(100% - 72px);
}

::v-deep(.el-table__body-wrapper) {
  // max-height: 601px;
  max-height: calc(100% - 40px);

  .el-tooltip {
    white-space: pre;
  }
}
::v-deep(.el-table--border th) {
  border-right: 0.05rem solid #ddd;
}
::v-deep(.el-table--border td) {
  border-right: 0px;
}
.expanBox {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 5%;
    // flex: 1;
  }
}
// .right-button {
//   cursor: pointer;
//   vertical-align: text-top;
//   display: inline-block;
//   width: 18px;
//   height: 18px;
//   background-size: 100% 100%;
//   margin-left: 10px;
//   background-image: url('../../../../../static/svg/right.svg');
// }
.toolTipBox{
  width:100%;max-height: 200px;overflow:auto;
}
.cabinetGroupTitle{
  line-height: 40px;
  height: 40px;
  text-align: center;
  background: LightGrey;
}
.cabinetGroupBox{
  width:100%; 
  height:30px; 
  display:flex;
}
.cabinetGroupItem {
  flex: 1;
  line-height: 30px;
  text-align: center;
  border: 1px solid #eee;
}
</style>
