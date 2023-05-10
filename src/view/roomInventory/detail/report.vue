<template>
  <div class="report-detail">
    <el-scrollbar height="100%">
      <div class="tool">
        <el-button class="btn" size="small" type="primary">导出</el-button>
      </div>
      <section class="statis">
        <div class="pie">
          <chart-pie />
        </div>
        <ul class="info">
          <li>
            <label>盘点任务编号:</label>
            <label>2</label>
          </li>
          <li>
            <label>发起时间:</label>
            <label>2</label>
          </li>
          <li>
            <label>盘点执行人:</label>
            <label>2</label>
          </li>
          <li>
            <label>盘点设备总数:</label>
            <label>2</label>
          </li>
          <li>
            <label>盘点设备总数:</label>
            <label>2</label>
          </li>
          <li>
            <label>盘点异常总数:</label>
            <label>2</label>
          </li>
          <li>
            <label>设备盘点合格率:</label>
            <label>2</label>
          </li>
          <li>
            <label>盘点时间:</label>
            <label>2</label>
          </li>
        </ul>
      </section>
      <section class="history">
        <h2>历史盘点情况</h2>
        <el-table :data="[]" stripe style="width: 100%">
          <el-table-column prop="date" align="center" label="盘点时间" />
          <el-table-column prop="name" align="center" label="设备总数" />
          <el-table-column prop="address" align="center" label="设备正常数" />
          <el-table-column prop="address" align="center" label="设备异常数" />
          <el-table-column prop="address" align="center" label="盘点合格率" />
        </el-table>
      </section>
      <section class="kind">
        <h2>设备分类统计</h2>
        <chart-bar />
      </section>
      <section class="abnormal">
        <h2>盘点异常记录</h2>
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

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import ChartPie from "@/component/elComponent/Chart-Pie.vue";
import ChartBar from "@/component/elComponent/Chart-Bar.vue";

export default defineComponent({
  name: "",
  components: {
    ChartPie,
    ChartBar,
  },
  setup() {},
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
