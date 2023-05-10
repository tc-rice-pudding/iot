<template>
  <div class="room-inventory">
    <aside>
      <tree></tree>
    </aside>
    <section>
      <header>
        <div class="left">
          <div class="group">
            <label>准确率低于</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
          <div class="group">
            <label>准确率低于</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
        </div>
        <div class="right">
          <el-button
            class="btn"
            size="small"
            type="primary"
            @click="onMultipleInvent"
            >盘点</el-button
          >
          <el-button
            class="btn"
            size="small"
            type="primary"
            @click="onMultipleAnalysis"
            >分析</el-button
          >
          <el-button class="btn" size="small" type="primary">导出</el-button>
        </div>
      </header>
      <section>
        <common-table
          ref="table"
          :config="config"
          :dealListData="dealListData"
          @on-selection-change="(select) => (selectData = select)"
        >
          <el-table-column label="操作" width="120">
            <template v-slot="scope">
              <el-button
                @click.stop="onView(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                @click.stop="onInvent(scope.row)"
                type="text"
                size="small"
                >盘点</el-button
              >
              <el-button
                @click.stop="onAnalysis(scope.row)"
                type="text"
                size="small"
                >分析</el-button
              >
            </template>
          </el-table-column>
        </common-table>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Tree from "./tree.vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";

export default defineComponent({
  name: "RoomInventory",
  components: {
    Tree,
    CommonTable,
  },
  setup() {
    const tableDependence = reactive({
      config: {
        showSelection: true,
        columns: [
          {
            prop: "name",
            label: "机房编号",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "序号",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "线上设备数",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "线下设备数",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "盘点准确率%",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "盘点覆盖率%",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "正常设备",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "异常设备",
            showTooltip: true,
          },
        ],
      },
      dealListData: (page, pageSize, sortObj) => {
        // todo
        return new Promise((res) => {
          console.log("dealListData");
          res({ total: 0, data: [] });
        });
      },
      onView: (row) => {
        // todo
        console.log(row);
      },
      onInvent: (row) => {
        // todo
        console.log(row);
      },
      onAnalysis: (row) => {
        // todo
        console.log(row);
      },
    });

    const onMultipleInvent = () => {
      // todo
    };
    const onMultipleAnalysis = () => {
      // todo
    };

    return { ...toRefs(tableDependence), onMultipleInvent, onMultipleAnalysis };
  },
});
</script>

<style lang="less" scoped>
.room-inventory {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;

  > aside {
  }
  > section {
    flex: 1;
    overflow: hidden;
    height: 100%;
    > header {
      height: 40px;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        .group {
          display: flex;
          > label {
            margin: 0 0.25rem;
            min-width: 70px;
            line-height: 1.65rem;
            text-align: center;
          }
        }
      }
      .right {
        width: 200px;
        text-align: right;
        .btn {
          margin-left: 5px;
        }
      }
    }
    > section {
      height: calc(100% - 40px);
    }
  }
}
</style>
