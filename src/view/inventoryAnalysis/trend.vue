<template>
  <div class="trend-view">
    <el-scrollbar height="100%">
      <section class="chart">
        <chart-line :options="lineOption" />
      </section>
      <section class="table">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="col in tableColums"
            :key="col.prop"
            :prop="col.prop"
            align="center"
            :label="col.label"
          />
        </el-table>
      </section>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import ChartLine from "@/component/elComponent/Chart-Line.vue";
import { trendRequest } from "@/api/iot";

export interface TrendItemType {
  // 日期
  [prop: string]: {
    inventoryAccuracy: number; // 准确率
    onlineDeviceCount: number; // 线上设备数
    offlineDeviceCount: number; // 线下设备数
  };
}

export default defineComponent({
  name: "Trend",
  props: {
    datePicker: {
      type: Array as PropType<string[]>,
      default: () => [] as string[],
    },
    checkedNode: {
      type: Array as PropType<string[]>,
      default: () => [] as string[],
    },
  },
  components: { ChartLine },
  setup(props) {
    const [startTime, endTime] = props.datePicker;
    let trendData: TrendItemType = reactive({});

    const getTrendRequest = async () => {
      const { status, data, message } = await trendRequest(
        startTime,
        endTime,
        props.checkedNode
      );
      if (status === 200) {
        trendData = data as TrendItemType;
      }
    };
    getTrendRequest();

    watch([() => props.datePicker, () => props.checkedNode], () => {
      getTrendRequest();
    });

    const lineOption = computed(() => ({
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: Object.entries(trendData).map(([time, valueObj]) => time),
      },
      yAxis: [
        {
          name: '数量',
          type: 'value',
          axisLine:{ show:true },
        },
        {
          name: '准确率(%)',
          type: 'value',
          axisLine:{ show:true },
        }
      ],
      series: [
        {
          name: "盘点准确率",
          type: "line",
          yAxisIndex: 1,
          // data: [120, 132, 101, 134, 90, 230, 210],
          data: Object.entries(trendData).map(([time, valueObj]) => valueObj.inventoryAccuracy),
        },
        {
          name: "线上设备数",
          type: "line",
          // data: [220, 182, 191, 234, 290, 330, 310],
          data: Object.entries(trendData).map(([time, valueObj]) => valueObj.offlineDeviceCount),
        },
        {
          name: "线下设备数",
          type: "line",
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: Object.entries(trendData).map(([time, valueObj]) => valueObj.onlineDeviceCount),
        },
      ],
    }));

    const tableColums = computed(() => [
      { prop: "static", label: "机房模块统计" },
      ...Object.entries(trendData).map(([time, valueObj]) => ({
        prop: time,
        label: time,
      })),
    ]);

    const tableData = computed(() => [
      Object.entries(trendData).reduce(
        (obj, [key, value]) => {
          obj[key] = value.inventoryAccuracy;
          return obj;
        },
        { static: "盘点准确率" } as any
      ),
      Object.entries(trendData).reduce(
        (obj, [key, value]) => {
          obj[key] = value.onlineDeviceCount;
          return obj;
        },
        { static: "线上设备数" } as any
      ),
      Object.entries(trendData).reduce(
        (obj, [key, value]) => {
          obj[key] = value.offlineDeviceCount;
          return obj;
        },
        { static: "线下设备数" } as any
      ),
    ]);

    return { lineOption, tableColums, tableData };
  },
});
</script>

<style lang="less" scoped>
.trend-view {
  width: 100%;
  height: 100%;
  .chart{
    min-height: 250px;
  }
}
::v-deep .el-table th.is-leaf,
.el-table td {
  background: #80808042;
}
</style>
