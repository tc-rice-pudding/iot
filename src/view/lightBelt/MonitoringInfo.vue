<template>
  <div class="wrap">
    <div class="left">
      <div
        v-if="singleDevice.isSingleDevice"
        style="text-align: center; padding-top: 45px"
      >
        <el-image style="width: 80%" :src="singleDeviceImg" :fit="fit" />
      </div>
      <cabinet-view
        ref="cabinetView"
        v-else
        :lightConfigParam="lightConfig"
        :tsdbData="tsdbData"
        :uList="uList"
        :deviceObj="deviceObj"
        :warningUSpaceList="warningUSpaceList"
      />
    </div>
    <div class="right">
      <section v-if="singleDevice.isSingleDevice" class="singleDeviceDetail">
        <div class="singleDeviceTitle">监控信息</div>
        <div class="singleDeviceContent">
          <div>
            <div class="singleDeviceItemTitle">监控状态</div>
            <div class="singleDeviceItemContent">
              {{ tsdbData.connectionStatus }}
            </div>
          </div>
          <div>
            <div class="singleDeviceItemTitle">温度</div>
            <div class="singleDeviceItemContent">
              {{ tsdbData.middleTemperature }}
            </div>
          </div>
          <div>
            <div class="singleDeviceItemTitle">湿度</div>
            <div class="singleDeviceItemContent">
              {{ tsdbData.middleHumidity }}
            </div>
          </div>
        </div>
      </section>
      <section style="height: 40px; text-align: right">
        <el-button
          type="primary"
          size="small"
          @click="onPositionMultiple('onPositionAll')"
          >定位</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="onPositionMultiple('onPositionAllCancel')"
          >取消定位</el-button
        >
      </section>
      <section
        :class="{
          singleDevice: singleDevice.isSingleDevice,
          nosingleDevice: !singleDevice.isSingleDevice,
        }"
      >
        <common-table
          ref="table"
          :config="config"
          :dealListData="dealListData"
          :cellStyleFn="() => {}"
        >
          <el-table-column
            v-if="!singleDevice.isSingleDevice"
            label="操作"
            width="120"
            class-name="columnFilter"
          >
            <template v-slot="scope">
              <el-button
                v-show="[1, '1'].includes(scope.row.positionStatus)"
                @click.stop="onPosition(scope.row, 0)"
                type="text"
                size="small"
                >取消定位</el-button
              >
              <el-button
                v-show="[0, '0'].includes(scope.row.positionStatus)"
                @click.stop="onPosition(scope.row, 1)"
                type="text"
                size="small"
                >定位</el-button
              >
            </template>
          </el-table-column>
        </common-table>
      </section>
    </div>
  </div>

  <aside v-if="showMultiplePosition">
    <common-dialog
      showFooter
      title="批量定位"
      width="400px"
      @handle-cancel="showMultiplePosition = false"
    >
      <template #content>
        <el-input
          v-model="uSpaceInput"
          placeholder="请输入定位 u 位, 以逗号分隔"
        />
      </template>
      <template #footer>
        <div class="x-btn-group">
          <el-button @click="doPositionMultiple" size="mini" type="primary"
            >确定</el-button
          >
          <el-button @click="showMultiplePosition = false" size="mini"
            >取消</el-button
          >
        </div>
      </template>
    </common-dialog>
  </aside>
</template>

<script>
import CabinetView from "./cabinetView.vue";
import CommonTable from "./CommonTable.vue";
import CommonDialog from "@/component/elComponent/CommonDialog.vue";
import { deepClonePlus, uuidv4 } from "@/utils/tool";
import { monitInfo, doPosition } from "@/api/iot";
import { U_LIST } from "./formEnum";
import axios from "axios";

export default {
  components: {
    CabinetView,
    CommonTable,
    CommonDialog,
  },
  // todo
  props: {
    cabinetNumber: String,
    zctID: String,
    isBindZct: {
      type: String,
      default: "0",
    },
  },
  data: function () {
    return {
      handelType: "",
      singleDeviceImg: require("./img/singleDeviceImg.png").default,
      showMultiplePosition: false,
      deviceObj: {},
      deviceList: [],
      uList: [],
      uSpaceInput: "",
      tsdbData: {
        upperTemperature: "", // 上温度
        middleTemperature: "", // 中温度（独体展示一个温度，取这个）
        downTemperature: "2", // 下温度
        middleHumidity: "", // 湿度
        connectionStatus: "", // 通讯状态
      },
      warningUSpaceList: [], // 告警 u位
      singleDevice: {},
      collectorLocation: "",
      config: {
        showSelection: false,
        showIndex: false,
        columns: [
          {
            prop: "pathTranslated",
            label: "设备位置",
          },
          {
            prop: "serial_num",
            label: "序列号",
            showTooltip: true,
          },
          {
            prop: "deviceInfoName",
            label: "设备类型",
            showTooltip: true,
          },
          {
            prop: "monitoringInfo",
            label: "监控信息",
            showTooltip: true,
          },
          {
            prop: "physicalStatus",
            label: "物理状态",
            showTooltip: true,
          },
        ],
      },
      lightConfig: {},
    };
  },
  watch: {
    cabinetNumber(value) {
      this.$refs.table.refreshTableData();
      this.warningUSpaceList = [];
    },
  },
  methods: {
    // 监控信息列表
    dealListData(page, pageSize, sortObj) {
      // isBindZct=0 为没有绑定资产条，没有绑定不展示设备
      if (!this.cabinetNumber && [0, "0"].includes(this.isBindZct)) {
        return new Promise((res, rej) => {
          this.uList = U_LIST.reverse();
          res({ total: 0, data: [] });
        });
      }
      return new Promise((res, rej) => {
        monitInfo({ number: this.cabinetNumber }).then(
          ({ data, total }) => {
            const {
              isSingleDevice,
              singleDeviceImageName,
              tsdbData,
              collectorLocation,
              deviceList,
              uList,
              lightConfig,
            } = data;
            this.collectorLocation = collectorLocation;
            // 是否是独体设备
            this.singleDevice = {
              isSingleDevice: [1, "1"].includes(isSingleDevice),
              singleDeviceImageName,
              singleDeviceImageUrl: "",
            };
            // 灯带配置信息 {}
            this.lightConfig = lightConfig;
            // 进风数据 []
            this.tsdbData = tsdbData;
            // 设备 []
            this.deviceList = deviceList;

            // 正常设备
            if (!this.singleDevice.isSingleDevice) {
              // 告警 u 位 []
              this.warningUSpaceList = uList
                .filter((it) => [1, "1"].includes(it.isAlarmBgC))
                .map((it) => Number(it.sn));
              // 设备对象 { pathTranslated : {设备对象}, ...}
              this.deviceObj = this.deviceList.reduce((obj, curr, inx) => {
                // 0: 正常綁定
                // 1: 末绑定
                // 2: 非法在架
                // 3: 设备尹失
                // 4: 位置错误
                // 放入 正常绑定的设备 和 告警设备
                if (
                  [0, "0"].includes(curr.monitoringCode) ||
                  this.warningUSpaceList.includes(curr.startU)
                ) {
                  uList[Number(curr.startU) - 1].pathTranslated =
                    curr.pathTranslated;
                  obj[curr.pathTranslated] = { ...curr };
                }
                return obj;
              }, {});
              console.log("--------------");
              console.log(this.deviceObj);
              console.log(this.warningUSpaceList);
              console.log("--------------");

              // u位数据 []
              this.uList = uList
                .filter((it) => {
                  [5, "5"].includes(it.sn)
                    ? (it.temperature = tsdbData.downTemperature)
                    : null;
                  [22, "22"].includes(it.sn)
                    ? (it.temperature = tsdbData.middleTemperature)
                    : null;
                  [40, "40"].includes(it.sn)
                    ? (it.temperature = tsdbData.upperTemperature)
                    : null;
                  return it;
                })
                .reverse();
            }

            res({ total, data: deviceList || [] });
          },
          (err) => {
            res({ total: 0, data: [] });
          }
        );
      });
    },
    onPosition(row, status) {
      const params = {
        cabinetNumber: this.cabinetNumber, // 所在机柜编号
        unitList: [], // 定位的起始U位
        status: status, // 定位为1，取消定位为0
        resourceId: [],
      };
      if (row.resourceId) {
        params.resourceId = [row.resourceId];
      } else {
        params.unitList = [row.startU];
      }
      doPosition(params).then(
        ({ status }) => {
          if (status === 200) {
            this.$refs.table.refreshTableData();
            row.positionStatus = status;
            this.$message.success("操作成功");
          } else {
            this.$message.error("定位失败");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onPositionMultiple(type) {
      this.handelType = type; // onPositionAllCancel、onPositionAll
      this.showMultiplePosition = true;
      this.uSpaceInput = "";
    },
    // 批量操作
    doPositionMultiple() {
      let uSpaceInputArr = this.uSpaceInput.split(",").map((it) => Number(it));

      doPosition({
        cabinetNumber: this.cabinetNumber, // 所在机柜编号
        unitList: uSpaceInputArr, // 定位的起始U位
        status: this.handelType === "onPositionAll" ? 1 : 0, // 定位为1，取消定位为0
        resourceId: [],
      })
        .then(
          ({ status }) => {
            if (status === 200) {
              this.$refs.table.refreshTableData();
              this.$message.success("操作成功");
            } else {
              this.$message.error("定位失败");
            }
          },
          (err) => {
            this.$message.error("定位失败");
            console.log(err);
          }
        )
        .finally(() => {
          this.showMultiplePosition = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  width: 100%;
  display: flex;
  .left {
    width: 530px;
    height: 100%;
  }
  .right {
    box-sizing: border-box;
    width: calc(100% - 530px);
    height: 100%;
    padding-right: 10px;
    .singleDeviceDetail {
      width: 100%;
      border: 1px solid #d8d6d6;
      margin-bottom: 10px;
      .singleDeviceTitle {
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600px;
      }
      .singleDeviceContent {
        display: flex;
        > div {
          flex: 1;
          border-top: 1px solid #d8d6d6;
          border-right: 1px solid #d8d6d6;
        }
      }
      .singleDeviceItemTitle {
        text-align: center;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .singleDeviceItemContent {
        height: 40px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: dodgerblue;
      }
    }
    .singleDevice {
      height: calc(100% - 40px -125px);
    }
    .nosingleDevice {
      height: calc(100% - 40px);
    }
  }
}

.x-btn-group {
  padding: 10px 10px 20px;

  display: flex;
  justify-content: flex-end;

  .x-button {
    padding: 5px;
  }
}
</style>
