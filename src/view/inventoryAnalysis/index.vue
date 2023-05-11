<template>
  <div class="inventory-analysis-view">
    <aside>
      <tree></tree>
    </aside>
    <section>
      <div class="left">
        <el-date-picker
          v-model="datePicker"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          size="small"
        />
      </div>
      <div class="right">
        <el-button class="btn" size="small" type="primary" @click="onExport"
          >导出</el-button
        >
      </div>
      <el-tabs v-model="tab">
        <el-tab-pane label="准确率趋势" name="trend"></el-tab-pane>
        <el-tab-pane label="不准确原因" name="reason"></el-tab-pane>
        <el-tab-pane label="不准确设备趋势" name="equipment"></el-tab-pane>
      </el-tabs>

      <div v-if="tab === 'trend'" class="detail-content">
        <trend />
      </div>
      <div v-if="tab === 'reason'" class="detail-content">
        <reason />
      </div>
      <div v-if="tab === 'equipment'" class="detail-content">
        <equipment />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import Tree from "@/view/common/tree.vue";
import Trend from "./trend.vue";
import Reason from "./reason.vue";
import Equipment from "./equipment.vue";

type Tab = "trend" | "reason" | "equipment";
export default defineComponent({
  name: "",
  components: {
    Tree,
    Trend,
    Reason,
    Equipment,
  },
  setup() {
    const tab = ref<Tab>("trend");
    const datePicker = ref([]);

    const onExport = () => {
      // todo
    };

    return {
      tab,
      datePicker,
      onExport,
    };
  },
});
</script>

<style lang="less" scoped>
.inventory-analysis-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  > aside {
    width: 280px;
  }
  > section {
    position: relative;
    flex: 1;
    .left {
      position: absolute;
      top: 0;
      left: 500px;
      z-index: 100;
    }
    .right {
      position: absolute;
      top: 0;
      right: 10px;
      z-index: 100;
    }

    .detail-content {
      height: calc(100% - 54px);
      padding: 0 10px;
      overflow: hidden;
      box-sizing: border-box;
    }
    ::v-deep(.el-tabs) {
      &__item {
        width: 150px;
        padding: 0 !important;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
      }
    }
  }
}
</style>
