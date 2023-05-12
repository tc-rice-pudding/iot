<template>
  <div class="wrap">
    <section>
      <div class="left-section">
        <tree @nodeClick="(node) => {activeTreeNode = node}"/>
      </div>
      <div class="right-section">
        <el-scrollbar height="100%">
          <monitoring-info :activeTreeNode="activeTreeNode" />
        </el-scrollbar>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import MonitoringInfo from "./MonitoringInfo.vue";
import Tree from "@/view/common/tree.vue";

export default defineComponent({
  components: {
    MonitoringInfo,
    Tree,
  },
  setup() {
    const activeTreeNode = reactive({});
    return { activeTreeNode };
  },
});
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
