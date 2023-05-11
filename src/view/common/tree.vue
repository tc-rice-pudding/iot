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
      show-checkbox
      node-key="id"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { getSpaceSubsInfo } from "@/api/iot";
import { ElTree } from "element-plus";

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}
export default defineComponent({
  setup() {
    const treeDependence = reactive({
      filterText: "",
      treeRef: ref<InstanceType<typeof ElTree>>(),
      defaultProps: {
        children: "children",
        label: "label",
      },
      filterNode: (value: string, data: Tree) => {
        if (!value) return true;
        return data.label.includes(value);
      },
      data: [
        {
          id: 1,
          label: "Level one 1",
          children: [
            {
              id: 4,
              label: "Level two 1-1",
              children: [
                {
                  id: 9,
                  label: "Level three 1-1-1",
                },
                {
                  id: 10,
                  label: "Level three 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "Level one 2",
          children: [
            {
              id: 5,
              label: "Level two 2-1",
            },
            {
              id: 6,
              label: "Level two 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "Level one 3",
          children: [
            {
              id: 7,
              label: "Level two 3-1",
            },
            {
              id: 8,
              label: "Level two 3-2",
            },
          ],
        },
      ] as Tree[],
    });

    watch(
      () => treeDependence.filterText,
      (val) => {
        treeDependence.treeRef.filter(val);
      }
    );

    // try {
    //   const res = await getSpaceSubsInfo();
    //   treeDependence.data = res.resource;
    // } catch (error) {
    //   console.log(error);
    // }

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
