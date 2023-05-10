<template>
  <div class="wrap">
    <section>
      <div class="left-section">
        <el-input
          clearable
          v-model="query"
          size="small"
          placeholder="请输入机柜编号"
          @input="inputHandel"
          @keydown.enter="onSearch"
        />、
        <!-- 懒加载树 -->
        <el-tree
          v-show="displayTreeType === 'lazyTree'"
          style="width:240px;"
          ref="tree"
          lazy
          node-key="resourceId"
          :default-expanded-keys="checkedKeyList"
          :load="onLoadLocTree"
          :props="locProps"
          highlight-current
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span
              :style="{ color: [1, '1'].includes(data.isBindZct) ? 'black' : '#a39f9f' }"
            >{{ node.label }}</span>
          </template>
        </el-tree>
        <!-- 搜索树 -->
        <el-tree
          v-show="displayTreeType === 'queryTree'"
          style="width:240px;"
          ref="treeRef"
          :data="queryTreeData"
          :props="locProps"
          node-key="resourceId"
          :current-node-key="currentNodeKey"
          highlight-current
          default-expand-all
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span
              :style="{ color: [1, '1'].includes(data.isBindZct) ? 'black' : '#a39f9f' }"
            >{{ node.label }}</span>
          </template>
        </el-tree>
      </div>
      <div class="right-section">
        <monitoring-info :cabinetNumber="cabinetNumber" :zctID="zctID"></monitoring-info>
      </div>
    </section>
  </div>
</template>

<script>
import MonitoringInfo from './MonitoringInfo';
import { getSubNodesInfo } from '@/api/overview';
import { spaceDeviceList } from '@/api/space';
import { spaceType, sortFn } from './enumData.js';
import { getCabinetTree } from '@/api/model';

export default {
  components: {
    MonitoringInfo,
  },
  data: function () {
    return {
      locProps: {
        label: 'name',
        isLeaf: 'leaf',
      },
      cabinetNumber: '',
      query: '',
      currentNodeKey: '',
      queryTreeData: [],
      displayTreeType: 'lazyTree',
      checkedKeyList: ['project_root'],
      tmpData: [
        { resourceId: 'project_root', parentId: '0', name: '建设银行数据中心', number: 'project_root', spaceType: 1 },
        { resourceId: 'ca9a81554a9f4afd97510b44a16f81f4', parentId: 'project_root', name: '稻香湖', number: 'DX', spaceType: 2 },
        {
          resourceId: '584320378e944af5aea90fe96cbced69',
          parentId: 'ca9a81554a9f4afd97510b44a16f81f4',
          name: '稻香湖C栋',
          number: 'DXC',
          location: 'project_root/ca9a81554a9f4afd97510b44a16f81f4',
          spaceType: 3,
        },
        {
          resourceId: '5f8106d697eb401aa20964d299baca24',
          parentId: '584320378e944af5aea90fe96cbced69',
          name: '稻香湖C栋1层',
          number: 'DXC1',
          location: 'project_root/ca9a81554a9f4afd97510b44a16f81f4/584320378e944af5aea90fe96cbced69',
          spaceType: 4,
        },
        {
          resourceId: 'dc69097368254a6a8879c661987f4d76',
          parentId: '5f8106d697eb401aa20964d299baca24',
          name: '稻香湖C栋1101',
          number: 'DXC1101',
          location: 'project_root/ca9a81554a9f4afd97510b44a16f81f4/584320378e944af5aea90fe96cbced69/5f8106d697eb401aa20964d299baca24',
          spaceType: 5,
        },
        {
          resourceId: 'f81276de542c47aba057c9498d134f20',
          parentId: 'dc69097368254a6a8879c661987f4d76',
          number: 'DXC1102AA03',
          name: null,
          networkArea: '网络区',
          networkAreaNumber: '网络区',
          specialLabel: null,
          inRow: 'fbc1602a429f486d889e86e21b267f20',
          responsibleDepartment: null,
        },
      ],
    };
  },
  watch: {
    query(val) {
      if (!val.length) {
        this.displayTreeType = 'lazyTree';
      }
    },
  },
  mounted() {
    // this.onSearch();
  },
  methods: {
    inputHandel(val) {
      if (!val.length) {
        this.displayTreeType = 'lazyTree';
      }
    },
    onSearch() {
      getCabinetTree({ number: this.query })
        .then(({ data, status }) => {
          this.displayTreeType = 'queryTree';

          data.forEach(it => {
            if (!('spaceType' in it)) {
              it.name = it.number;
            }
          });

          this.queryTreeData = this.recursionDealTreeData(data, '0');

          this.$nextTick(function () {
            let firstCabinet = data.find(it => !('spaceType' in it));
            this.currentNodeKey = firstCabinet.resourceId;
            this.$refs.treeRef.setCurrentKey(firstCabinet.resourceId);
            this.cabinetNumber = firstCabinet.number;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    recursionDealTreeData(data, pKey) {
      let result = [];
      let temp;
      for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === pKey) {
          temp = this.recursionDealTreeData(data, data[i].resourceId);
          if (temp.length > 0) {
            data[i].children = temp;
          }
          result.push(data[i]);
        }
      }
      return result;
    },
    customNodeClass(data, node) {
      if (data.isPenultimate) {
        return 'is-penultimate';
      }
      return null;
    },
    handleNodeClick(data) {
      const { location, resourceId, isCabinet, number, isBindZct, zctID, spaceType } = data;
      if (!spaceType) {
        this.cabinetNumber = number;
        this.zctID = zctID;
      } else {
        this.cabinetNumber = '';
        this.zctID = '';
      }
    },
    async onLoadLocTree(node, resolve) {
      let tmpData;
      if (node.level === 0) {
        let root = this.root || [{ name: '建行数据中心', resourceId: 'project_root', number: 'project_root', isBindZct: 1 }];
        tmpData = root;
      } else if ([1, 2, 3, 4, 5].includes(node.level)) {
        const res = await getSubNodesInfo(node.key || 'project_root');
        if (node.key === 'project_root') sortFn(res?.data);
        tmpData = res?.data || [];
      } else if (node.level === 6) {
        const { location, resourceId } = node.data;
        const tmpLocation = location ? location + '/' + resourceId : resourceId;
        const res = await spaceDeviceList(this.setParams(tmpLocation), {
          class: 'root',
          resourceId: 'project_root',
          subclass: 'cabinet',
        });
        tmpData =
          res?.data.filter(it => {
            it.name = it.number;
            it.leaf = true;
            it.isCabinet = true;
            return it;
          }) || [];
      }

      tmpData.forEach(it => {
        if (['project_root', 'DX', 'DXC', 'DXC4', 'DXC4102', 'DXC4102AC'].includes(it.number)) {
          this.checkedKeyList.push(it.resourceId);
        } else if (it.number === 'DXC4102AC03') {
          setTimeout(() => {
            this.$refs.tree.setCurrentKey(it.resourceId, true);
            // this.$refs.tree.setCurrentNode(it, true);
            this.handleNodeClick(it);
          }, 10);
        }
      });
      resolve(tmpData);
    },
    setParams(id) {
      return {
        advParam: [],
        where: [
          {
            terms: [
              {
                field: 'location',
                operator: 'eq',
                value: id,
              },
            ],
          },
        ],
        sorts: [],
        page: {
          number: 1,
          size: 9999,
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #eff5f9;
  box-sizing: border-box;
  overflow-x: hidden;

  > section {
    height: 100%;
    background: #fff;
    display: flex;

    .left-section {
      box-sizing: border-box;
      flex: 1;
      padding: 10px 10px 10px 0;
      width: 260px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      border-right: 1px solid #eee;
    }
    .right-section {
      width: calc(100% - 260px);
      height: 100%;
      padding-right: 10px;
      overflow-y: auto;
      padding: 10px 0;
      box-sizing: border-box;
    }
  }
}

.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>
