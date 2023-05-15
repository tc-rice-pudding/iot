<template>
  <div class="report-detail">
    <el-scrollbar height="100%">
      <div class="tool">
        <el-button class="btn" size="small" type="primary" @click="onExport"
          >导出</el-button
        >
      </div>
      <section class="statis">
        <div class="pie">
          <chart-pie :options="optionPie" />
        </div>
        <ul class="info">
          <li>
            <label>盘点任务编号:</label>
            <label>{{ taskInfo.taskCode }}</label>
          </li>
          <li>
            <label>发起时间:</label>
            <label>{{ taskInfo.createDate }}</label>
          </li>
          <li>
            <label>完成时间:</label>
            <label>{{ taskInfo.finishDate }}</label>
          </li>
          <li>
            <label>盘点执行人:</label>
            <label>{{ taskInfo.executorName }}</label>
          </li>
          <li>
            <label>盘点资产总数:</label>
            <label>{{ taskInfo.totalNum }}</label>
          </li>
          <li>
            <label>盘点异常总数:</label>
            <label>{{ taskInfo.exceptionNum }}</label>
          </li>
          <li>
            <label>设备盘点合格率:</label>
            <label>{{ taskInfo.passPercent }}</label>
          </li>
          <li>
            <label>盘点时间:</label>
            <label>{{ taskInfo.inventoryTime }}</label>
          </li>
        </ul>
      </section>
      <section class="history">
        <h2>历史盘点情况</h2>
        <el-table :data="historyInventorys" stripe style="width: 100%">
          <el-table-column prop="time" align="center" label="盘点时间" />
          <el-table-column prop="total" align="center" label="设备总数" />
          <el-table-column prop="passCount" align="center" label="设备正常数" />
          <el-table-column prop="failCount" align="center" label="设备异常数" />
          <el-table-column
            prop="passPercent"
            align="center"
            label="盘点合格率(%)"
          />
        </el-table>
      </section>
      <section class="kind">
        <h2>设备分类统计</h2>
        <chart-bar :options="optionBar" />
      </section>
      <section class="abnormal">
        <h2>盘点异常记录</h2>
        <common-table
          ref="table"
          class="section"
          :config="config"
          :dealListData="dealListData"
        />
      </section>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import ChartPie from "@/component/elComponent/Chart-Pie.vue";
import ChartBar from "@/component/elComponent/Chart-Bar.vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";
import { ElMessage } from "element-plus";
import { fileDownload } from "@/utils/tool";
import { useRoute, useRouter } from "vue-router";
import { report, reportExport } from "@/api/iot";

export default defineComponent({
  name: "",
  components: {
    ChartPie,
    ChartBar,
    CommonTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const reportDependence = reactive({
      inventorySituation: [] as Array<{ name: string; count: number }>, // 饼图正常异常数
      taskInfo: {
        taskCode: "", // 盘点任务编号
        createDate: "", // 发起时间
        finishDate: "", // 完成时间
        executorName: "", // 盘点执行人
        totalNum: "", // 盘点资产总数
        exceptionNum: "", // 盘点异常总数
        passPercent: "", // 资产盘点合格率
        inventoryTime: "", // 盘点时间
      },
      isInventoryPlan: true, // true展示列表，false不展示
      historyInventorys: [], // 历史盘点
      inventoryAssetType: [] as Array<{ name: string; count: number }>, // 设备分类统计柱状图
      inventoryException: [], //盘点异常记录
      config: {
        columns: [
          {
            prop: "deviceInfo",
            label: "资产分类",
            showTooltip: true,
          },
          {
            prop: "deviceLocation",
            label: "资产位置",
            showTooltip: true,
          },
          {
            prop: "currentPosition",
            label: "设备当前位置",
            showTooltip: true,
          },
          {
            prop: "actualDeviceName",
            label: "实际上架设备",
            showTooltip: true,
          },
          {
            prop: "deviceName",
            label: "资产名称",
            showTooltip: true,
          },
          {
            prop: "deviceNum",
            label: "资产编号",
            showTooltip: true,
          },
          {
            prop: "deviceStatus",
            label: "资产状态",
            showTooltip: true,
          },
          {
            prop: "remark",
            label: "备注",
            showTooltip: true,
          },
          {
            prop: "resultStatus",
            label: "盘点结果",
            showTooltip: true,
          },
        ],
      },
      dealListData: async (page: number, pageSize: number, sortObj: any) => {
        return new Promise(async (res) => {
          const { data, status, message, total } = await report(
            route.params?.id as string,
            {
              number: page,
              size: pageSize,
            }
          );
          if (status === 200) {
            Object.assign(reportDependence, data);
            res({
              total: data.inventoryException.total,
              data: data.inventoryException.data,
            });
            return;
          }
          res({ total: 0, data: [] });
        });
      },
    });

    const onExport = async () => {
      try {
        const { status, data, headers } = await reportExport(
          route.params?.id as string
        );
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

    const optionPie = computed(() => {
      return {
        title: {
          text: "",
          left: "center",
          textStyle: {
            fontSize: 16,
            color: "#666",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          valueType: "percent",
          textStyle: { fontSize: 12 },
        },
        legend: {
          left: "center",
          top: "10%",
          textStyle: {
            color: "#666",
            fontSize: 12,
          },
        },
        series: [
          {
            type: "pie",
            radius: "30%",
            data: reportDependence.inventorySituation.map((it) => ({
              name: it.name,
              value: it.count,
            })),
          },
        ],
      };
    });

    const optionBar = computed(() => {
      return {
        title: {
          text: "",
          top: "10",
          left: "10",
          textStyle: {
            fontSize: 16,
            color: "#666",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
          axisPointer: { type: "none" },
          textStyle: { fontSize: 12 },
        },
        xAxis: [
          {
            type: "category",
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            data: reportDependence.inventoryAssetType.map(it=>it.name),
            axisTick: { show: false, alignWithLabel: true },
            axisLabel: { interval: 0, rotate: 30 }
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "35%",
            label: {
              show: true,
              position: "top",
              color: "#5483FF",
            },
            // data: [10, 52, 200, 334, 380, 330, 220],
            data: reportDependence.inventoryAssetType.map(it=>it.count),
          },
        ],
      };
    });
    return { onExport, ...toRefs(reportDependence), optionPie, optionBar };
  },
});
</script>

<style lang="less" scoped>
.report-detail {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;

  .tool {
    padding: 1px;
  }
  .statis {
    height: 300px;
    width: 100%;
    display: flex;
    .pie {
      flex: 1;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      > li {
        flex: 1;
        display: flex;
        line-height: 37px;

        label:first-child {
          background: #eee;
          text-align: right;
          padding: 0 10px;
          flex: 1;
        }
        label:last-child {
          text-align: left;
          padding: 0 10px;
          flex: 1;
        }
      }
    }
  }
  .history {
    width: 100%;
    > h2 {
      background: #eee;
      padding: 10px;
      margin: 0;
    }
  }
  .kind {
    width: 100%;
    > h2 {
      background: #eee;
      padding: 10px;
      margin: 0;
    }
  }
  .abnormal {
    width: 100%;
    > h2 {
      background: #eee;
      padding: 10px;
      margin: 0;
    }
  }
}

::v-deep .el-table th.is-leaf,
.el-table td {
  background: #80808042;
}
</style>
