<template>
  <div class="tree-wrap">
    <el-input
      style="margin-bottom: 10px"
      clearable
      v-model="query"
      size="small"
      placeholder=""
      @input="inputHandel"
      @keydown.enter="onSearch"
    />
    <el-tree
      ref="treeRef"
      :show-checkbox="showCheckbox"
      node-key="resourceId"
      :data="data"
      :props="defaultProps"
      @node-click="nodeClick"
      default-expand-all
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { getSpaceSubsInfo, AOB } from "@/api/iot";
import { ElMessage, ElTree } from "element-plus";

interface TreeData {
  // 1:"区域"，2:"数据中心"，3:"楼栋"，4:"楼层"，5:"机房"，6:"机柜列"，7:"机柜位"，8:"机柜空间"
  spaceType: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  name: string;
  resourceId: string;
  parentId: string; // 空串代表根节点
  location: string;
  isBindZct?: boolean; // 是否绑定资产条（机柜的属性）
  children?: TreeData[];
}

export default defineComponent({
  name: "IotTree",
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["nodeClick"],
  setup(props, { emit }) {
    const treeDependence = reactive({
      filterText: "",
      treeRef: ref<InstanceType<typeof ElTree>>(),
      defaultProps: {
        children: "children",
        label: "name",
      },
      filterNode: (value: string, data: TreeData) => {
        if (!value) return true;
        return data.name.includes(value);
      },
      nodeClick: (node: TreeData) => {
        if (node.spaceType !== "8") {
          getSpaceSubsInfoRequest({ resourceId: node.resourceId });
        } else {
          emit("nodeClick", node);
        }
      },
      data: [
        {
          resourceId: "3",
          name: "Level one 3",
          children: [
            {
              resourceId: "7",
              name: "Level two 3-1",
              spaceType: "8",
            },
            {
              resourceId: "8",
              name: "Level two 3-2",
            },
          ],
        },
      ] as TreeData[],
    });

    const spaceTree = reactive({
      // 树的 list 数据
      data: [] as TreeData[],
      // 构建空间树型结构的数据
      buildTreeData: (parentNode: TreeData, list: TreeData[]) => {
        if (parentNode.spaceType === "8") {
          return;
        }

        if (!Array.isArray(parentNode.children)) {
          parentNode.children = [];
        }

        list.forEach((item) => {
          if (item.parentId === parentNode.resourceId) {
            parentNode.children?.push(item);
            spaceTree.buildTreeData(item, list);
          }
        });
      },
    });

    // 获取树（list，需要处理成树形结构）
    const getSpaceSubsInfoRequest = async (param: AOB) => {
      try {
        const { status, data, message } = await getSpaceSubsInfo(param);
        if (status === 200) {
          const filterRepeatData = ((data as TreeData[]) || []).filter((el) =>
            spaceTree.data.find((it) => it.resourceId !== el.resourceId)
          );

          spaceTree.data.push(...filterRepeatData);
          return;
        }
        ElMessage({ type: "error", message: "获取空间树失败..." });
      } catch (error) {
        console.log(error);
      }
    };
    getSpaceSubsInfoRequest({ resourceId: "" }); // 初始化树形结构

    watch(
      () => spaceTree.data,
      () => {
        const parentNodes = spaceTree.data.filter((it) => it.resourceId === "");
        parentNodes.forEach((parentNode) => {
          spaceTree.buildTreeData(parentNode, spaceTree.data);
        });
        treeDependence.data = parentNodes;
      }
    );

    watch(
      () => treeDependence.filterText,
      async (val) => {
        await getSpaceSubsInfoRequest({ name: val });
        treeDependence.treeRef.filter(val);
      }
    );

    return { ...toRefs(treeDependence) };
  },
});
</script>

<style lang="less" scoped>
.tree-wrap {
  box-sizing: border-box;
  flex: 1;
  padding: 10px;
  width: 260px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #eee;
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
