<template>
  <div class="report-info">
    <header>
      <div class="left">
        <div class="group">
          <label>任务编号</label>
          <label>sasfasdasdasfasda</label>
        </div>
        <div class="group">
          <label>任务名称</label>
          <label>sasfasdasdasfasda 2020-02-23</label>
        </div>
        <div class="group">
          <label>设备位置</label>
          <label>稻香湖</label>
        </div>
        <div class="group">
          <label>设备类型</label>
          <label>所有类型</label>
        </div>
        <div class="group">
          <label>机房</label>
          <label>sss</label>
        </div>
      </div>
      <div class="right">
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="input"
          size="small"
          placeholder="Please input"
          clearable
        />
        <el-button class="btn" size="small" type="primary" @click="onSearch"
          >查询</el-button
        >
        <el-button class="btn" size="small" type="primary" @click="onExport"
          >导出</el-button
        >
      </div>
    </header>
    <common-table
      ref="table"
      class="section"
      :config="config"
      :dealListData="dealListData"
      @on-selection-change="(select) => (selectData = select)"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";

export default defineComponent({
  components: {
    CommonTable,
  },
  setup() {
    const tableDependence = reactive({
      config: {
        columns: [
          {
            prop: "name",
            label: "序列号",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "设备类型",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "设备状态",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "设备位置",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "当前位置",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "当前设备",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "盘点状态",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "盘点结果",
            showTooltip: true,
          },
          {
            prop: "name",
            label: "备注",
            showTooltip: true,
          },
        ],
      },
      dealListData: (page, pageSize, sortObj) => {
        // todo
        return new Promise((res) => {
          console.log("dealListData");
          res({ total: 0, data: [] });
        });
      },
    });

    return { ...toRefs(tableDependence) };
  },
});
</script>

<style lang="less" scoped>
.report-info {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;
  > header {
    height: 80px;
    background: #eee;
    display: flex;
    .left {
      display: flex;
      flex-wrap: wrap;
      max-width: 750px;
      .group {
        display: flex;
        width: 240px;
        height: 40px;
        line-height: 40px;
        label:first-child {
          text-align: right;
          width: 60px;
          padding-right: 10px;
        }
        label:last-child {
          text-align: left;
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .right {
      padding-top: 10px;
      flex: 1;
    }
  }
  .section {
    height: calc(100% - 80px);
  }
}
</style>
