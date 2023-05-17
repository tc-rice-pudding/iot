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
        <trend :datePicker="datePicker" :checkedNode="nodeCheckedList" />
      </div>
      <div v-if="tab === 'reason'" class="detail-content">
        <reason :datePicker="datePicker" :checkedNode="nodeCheckedList" />
      </div>
      <div v-if="tab === 'equipment'" class="detail-content">
        <equipment :datePicker="datePicker" :checkedNode="nodeCheckedList" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import Tree from "@/view/common/tree.vue";
import Trend from "./trend.vue";
import Reason from "./reason.vue";
import Equipment from "./equipment.vue";
import { fileDownload } from "@/utils/tool";
import { accuracyExport } from "@/api/iot";
import { ElMessage } from "element-plus";

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
    let nodeCheckedList = ref([]);

    let resourceIdList = computed(()=>nodeCheckedList.value.map(it=>it.resourceId));

    const onExport = async () => {
      const [startTime, endTime] = datePicker.value;
      try {
        const { status, data, headers } = await accuracyExport( startTime, endTime, resourceIdList.value);
        if (status === 200 && data.size > 0) {
          let name = headers["content-disposition"].match(/filename=(.*)/)[1];
          fileDownload(data, decodeURI(name), false);
        } else {
          ElMessage({ type: "error", message: data?.message || "下载失败！" });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      tab,
      datePicker,
      onExport,
      nodeCheckedList,
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
