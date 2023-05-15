<template>
  <div class="report-info">
    <header>
      <div class="left">
        <div class="group">
          <label>任务编号:</label>
          <label>{{taskInfo.taskCode}}</label>
        </div>
        <div class="group">
          <label>任务名称:</label>
          <label>{{taskInfo.taskName}}</label>
        </div>
        <div class="group">
          <label>设备位置:</label>
          <label>{{taskInfo.locationScopeName}}</label>
        </div>
        <div class="group">
          <label>设备类型:</label>
          <label>{{taskInfo.deviceScopeName}}</label>
        </div>
        <div class="group">
          <label>所属部门:</label>
          <label>{{taskInfo.departmentName}}</label>
        </div>
        <div class="group">
          <label>盘点资产类型:</label>
          <label>{{taskInfo.inventoryDeviceType}}</label>
        </div>
      </div>
      <div class="right">
        <el-input
          style="width: 200px; margin-right: 10px"
          v-model="key"
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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";
import { useRouter, useRoute } from "vue-router";
import { getInfo, infoExport } from "@/api/iot";
import { ElMessage } from "element-plus";
import { fileDownload } from "@/utils/tool";

export default defineComponent({
  components: {
    CommonTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const table = ref<InstanceType<typeof CommonTable>>();

    const tableDependence = reactive({
      taskInfo: {
        //任务信息
        taskCode: "", // 盘点任务编号
        taskName: "", //任务名称
        deviceScopeName: "", //资产分类
        deviceScopeValue: "", //资产分类code
        locationScopeName: "", //地理位置
        departmentName: "", //所属部门
        locationScopeValue: "", //地理位置code
        inventoryDeviceType: "", //盘点资产类型
      },
      key: "",
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
      dealListData: (page: number, pageSize: number, sortObj: any) => {
        console.log("dealListData");
        return new Promise(async (res) => {
          const { data, status, message, total } = await getInfo(
            tableDependence.key,
            route.params?.id as string,
            {
              number: page,
              size: pageSize,
            }
          );
          if (status === 200) {
            Object.assign(tableDependence.taskInfo, data.taskInfo);
            res({
              total: data.inventoryResult.total,
              data: data.inventoryResult.data,
            });
            return;
          }
          res({ total: 0, data: [] });
        });
      },
    });

    const onSearch = () => table.value?.refreshTableData();

    const onExport = async () => {
      try {
        const { status, data, headers } = await infoExport(
          tableDependence.key,
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

    return { ...toRefs(tableDependence), onSearch, onExport };
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
          width: 80px;
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
