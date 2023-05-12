<template>
  <div class="alarm_device">
    <aside>
      <tree></tree>
    </aside>
    <section>
      <header>
        <div class="left">
          <div class="group">
            <label>设备类型</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
          <div class="group">
            <label>设备序列号</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
          <div class="group">
            <label>设备位置</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
          <div class="group">
            <label>日期</label>
            <el-input
              v-model="input"
              size="small"
              placeholder="Please input"
              clearable
            />
          </div>
          <el-button class="btn" size="small" type="primary">查询</el-button>
        </div>
        <div class="right">
          <el-button class="btn" size="small" type="primary">导出</el-button>
        </div>
      </header>
      <section>
        <common-table
          ref="table"
          :config="config"
          :dealListData="dealListData"
          @on-selection-change="(select) => (selectData = select)"
        >
          <el-table-column label="操作" width="120">
            <template v-slot="scope">
              <el-button
                @click.stop="onView(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </common-table>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Tree from "@/view/common/tree.vue";
import CommonTable from "@/component/elComponent/CommonTable.vue";

export default defineComponent({
  name: "",
  components: { CommonTable, Tree },
  setup() {
    const tabelConfig = reactive({
      config: {
        showSelections: true,
        columns: [
          {
            prop: "sn",
            label: "设备序列号",
            showTooltip: true,
          },
          {
            prop: "deviceLocation",
            label: "设备位置",
            showTooltip: true,
          },
          {
            prop: "deviceType",
            label: "设备类型",
            showTooltip: true,
          },
          {
            prop: "alarmCount",
            label: "告警次数",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "communicationAbnormal",
            label: "通讯异常",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "temperatureAbnormal",
            label: "温度异常",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "humidityAbnormal",
            label: "湿度异常",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "positionWrongCount",
            label: "位置错误",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "illegalOnCount",
            label: "非法在架",
            showTooltip: true,
            sortable: true,
          },
          {
            prop: "deviceLossCount",
            label: "设备丢失",
            showTooltip: true,
            sortable: true,
          },
        ],
      },
      dealListData: (page: number, pageSize: number, sortObj: any) => {
        // todo
        return new Promise((res) => {
          console.log("dealListData");
          res({ total: 0, data: [] });
        });
      },
      onView: (row: any) => {
        // todo
        console.log(row);
      },
    });

    return { ...toRefs(tabelConfig) };
  },
});
</script>

<style lang="less" scoped>
.alarm_device {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;

  > section {
    flex: 1;
    overflow: hidden;
    height: 100%;
    > header {
      height: 40px;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        .group {
          display: flex;
          > label {
            margin: 0 0.25rem;
            min-width: 70px;
            line-height: 1.65rem;
            text-align: center;
          }
        }
        .btn {
          margin-left: 10px;
        }
      }
      .right {
        padding-top: 5px;
        width: 200px;
        text-align: right;
        .btn {
          margin-left: 5px;
        }
      }
    }
    > section {
      height: calc(100% - 40px);
    }
  }
}
</style>