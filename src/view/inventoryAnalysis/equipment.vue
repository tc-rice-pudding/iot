<template>
  <div class="equipment-view">
    <el-scrollbar height="100%">
      <section class="chart">
        <chart-line :options="lineOption" />
      </section>
      <section class="table">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" align="center" label="日期" />
          <el-table-column
            prop="inventoryAccuracy"
            align="center"
            label="盘点准确率%"
          />
          <el-table-column
            prop="deviceLossCount"
            align="center"
            label="资产丢失"
          />
          <el-table-column
            prop="illegalOnCount"
            align="center"
            label="非法在架"
          />
          <el-table-column
            prop="locationConflictCount"
            align="center"
            label="位置错误"
          />
          <el-table-column
            prop="positionWrongCount"
            align="center"
            label="未检测到标签"
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
} from "vue";
import ChartLine from "@/component/elComponent/Chart-Line.vue";
import { ReasonRequest } from "@/api/iot";

export interface ItemType {
  // 日期
  [prop: string]: {
    deviceLossCount: number; // 资产丢失
    illegalOnCount: number; // 非法在架
    inventoryAccuracy: number; // 盘点准确率
    locationConflictCount: number; // 位置错误
    notLabelCount: number; // 未检测到标签
    positionWrongCount: number; // 位置错误
  };
}
export default defineComponent({
  name: "Equipment",
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
    let equipmentData: ItemType = reactive({});

    const getTrendRequest = async () => {
      const { status, data, message } = await ReasonRequest(
        startTime,
        endTime,
        props.checkedNode
      );
      if (status === 200) {
        equipmentData = data as ItemType;
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
        data: Object.entries(equipmentData).map(([time, valueObj]) => time),
      },
      yAxis: [
        {
          name: "数量",
          type: "value",
          axisLine: { show: true },
        },
        {
          name: "准确率(%)",
          type: "value",
          axisLine: { show: true },
        },
      ],
      series: [
        {
          name: "盘点准确率",
          type: "line",
          yAxisIndex: 1,
          // data: [120, 132, 101, 134, 90, 230, 210],
          data: Object.entries(equipmentData).map(
            ([time, valueObj]) => valueObj.inventoryAccuracy
          ),
        },
        {
          name: "资产丢失",
          type: "line",
          // data: [220, 182, 191, 234, 290, 330, 310],
          data: Object.entries(equipmentData).map(
            ([time, valueObj]) => valueObj.deviceLossCount
          ),
        },
        {
          name: "非法在架",
          type: "line",
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: Object.entries(equipmentData).map(
            ([time, valueObj]) => valueObj.illegalOnCount
          ),
        },
        {
          name: "位置错误",
          type: "line",
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: Object.entries(equipmentData).map(
            ([time, valueObj]) => valueObj.positionWrongCount
          ),
        },
        {
          name: "未检测到标签",
          type: "line",
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: Object.entries(equipmentData).map(
            ([time, valueObj]) => valueObj.notLabelCount
          ),
        },
      ],
    }));

    const tableData = computed(() =>
      Object.entries(equipmentData).map(([time, value]) => ({
        date: time,
        deviceLossCount: value.deviceLossCount,
        illegalOnCount: value.illegalOnCount,
        inventoryAccuracy: value.inventoryAccuracy,
        locationConflictCount: value.locationConflictCount,
        notLabelCount: value.notLabelCount,
        positionWrongCount: value.positionWrongCount,
      }))
    );
    return { lineOption, tableData };
  },
});
</script>

<style lang="less" scoped>
.trend-view {
  width: 100%;
  height: 100%;
  .chart {
    min-height: 250px;
  }
}
::v-deep .el-table th.is-leaf,
.el-table td {
  background: #80808042;
}
</style>
