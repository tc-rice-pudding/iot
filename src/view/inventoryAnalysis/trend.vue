<template>
  <div class="trend-view">
    <el-scrollbar height="100%">
      <section class="chart">
        <chart-pie />
      </section>
      <section class="table">
        <el-table :data="[]" stripe style="width: 100%">
          <el-table-column prop="date" align="center" label="序列号" />
          <el-table-column prop="name" align="center" label="设备分类" />
          <el-table-column prop="address" align="center" label="设备状态" />
          <el-table-column prop="address" align="center" label="设备位置" />
          <el-table-column prop="address" align="center" label="当前位置" />
          <el-table-column prop="address" align="center" label="当前设备" />
          <el-table-column prop="address" align="center" label="盘点结果" />
          <el-table-column prop="address" align="center" label="备注" />
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
