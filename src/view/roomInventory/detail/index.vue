<template>
  <div class="room-inventory-detail">
    <header>
      <div @click="onBack" class="back">
        <i class="el-icon-arrow-left font-style"></i>
      </div>
    </header>

    <section>
      <el-tabs v-model="tab">
        <el-tab-pane label="盘点报告" name="report"></el-tab-pane>
        <el-tab-pane label="盘点明细" name="info"></el-tab-pane>
      </el-tabs>

      <div v-show="tab === 'report'" class="detail-content">
        <report />
      </div>
      <div v-show="tab === 'info'" class="detail-content">
        <info />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import Info from "./info.vue";
import Report from "./report.vue";
import { useRouter } from "vue-router";

type Tab = "report" | "info";
export default defineComponent({
  name: "RoomInventoryDetail",
  components: {
    Info,
    Report,
  },
  setup() {
    const router = useRouter();
    const tab = ref<Tab>("report");

    const onBack = () => router.go(-1);

    return { tab, onBack };
  },
});
</script>

<style lang="less" scoped>
.room-inventory-detail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  > header {
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .back {
      padding-right: 20px;
      font-size: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;

      > label {
        padding-left: 10px;
        font-size: 18px;
        cursor: pointer;
      }

      &:hover {
        color: #409eff;
      }
    }
  }

  > section {
    height: calc(100% - 51px);

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
