<template>
  <div class="overview-view">
    <el-scrollbar height="100%">
      <h2>物联监控统计</h2>
      <section class="monitor">
        <div class="part">
          <chart-pie />
        </div>
        <div class="part">
          <chart-pie />
        </div>
        <div class="part">
          <chart-pie />
        </div>
        <div class="part">
          <chart-pie />
        </div>
        <div class="part">
          <chart-pie />
        </div>
      </section>
      <section class="alarm">
        <div class="part"></div>
        <div class="part"></div>
        <div class="part"></div>
      </section>
      <section class="accuracy">
        <div class="part"></div>
        <div class="part"></div>
        <div class="part"></div>
      </section>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import ChartPie from "@/component/elComponent/Chart-Pie.vue";

export default defineComponent({
  name: "",
  components: {
    ChartPie,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.overview-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

  h2 {
    margin: 0;
    padding: 10px;
    background: #eee;
    border: 1px solid;
  }
  section {
    min-height: 250px;
    width: 100%;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    box-sizing: border-box;
  }
  .monitor {
    display: flex;
    .part {
      flex: 1;
    }
  }
  .alarm {
    display: flex;
    background: brown;
    .part {
      flex: 1;
      &:not(:last-child) {
        border-right: 1px solid;
      }
    }
  }
  .accuracy {
    display: flex;
    background: cadetblue;
    .part {
      flex: 1;
      &:not(:last-child) {
        border-right: 1px solid;
      }
    }
  }
}
</style>
