<template>
  <div class="reason-view">
    <el-scrollbar height="100%">
      <section class="chart">
        <chart-pie />
      </section>
      <section class="table">
        <el-table :data="[]" stripe style="width: 100%">
          <el-table-column prop="date" align="center" label="日期" />
          <el-table-column prop="name" align="center" label="盘点准确率%" />
          <el-table-column prop="address" align="center" label="资产丢失" />
          <el-table-column prop="address" align="center" label="非法在架" />
          <el-table-column prop="address" align="center" label="位置错误" />
          <el-table-column prop="address" align="center" label="未检测到标签" />
        </el-table>
      </section>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ChartPie from "@/component/elComponent/Chart-Pie.vue";

export default defineComponent({
  name: "",
  components: { ChartPie },
  setup() {},
});
</script>

<style lang="less" scoped>
.trend-view {
  width: 100%;
  height: 100%;
}
::v-deep .el-table th.is-leaf,
.el-table td {
  background: #80808042;
}
</style>
