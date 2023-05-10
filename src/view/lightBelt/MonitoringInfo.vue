<template>
  <div class="wrap">
    <div class="left">
      <div v-if="singleDevice.isSingleDevice" style="text-align: center; padding-top: 45px;">
        <el-image style="width: 80%;" :src="singleDeviceImg" :fit="fit" />
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
            <div class="singleDeviceItemContent">{{ tsdbData.connectionStatus }}</div>
          </div>
          <div>
            <div class="singleDeviceItemTitle">温度</div>
            <div class="singleDeviceItemContent">{{ tsdbData.middleTemperature }}</div>
          </div>
          <div>
            <div class="singleDeviceItemTitle">湿度</div>
            <div class="singleDeviceItemContent">{{ tsdbData.middleHumidity }}</div>
          </div>
        </div>
      </section>
      <section style="height:40px; text-align: right;">
        <el-button
          v-if="zctID && gPermission['dcom:assetsManager:cabinetsOverview:viewRealValue']"
          type="primary"
          size="small"
          @click="showRealTimeVal = true"
        >查看实时值</el-button>
        <el-button
          v-if="!singleDevice.isSingleDevice && gPermission['dcom:assetsManager:assetsOverview:batch:matchPosition']"
          type="primary"
          size="small"
          @click="onPositionAllHandel"
        >定位</el-button>
        <el-button
          v-if="!singleDevice.isSingleDevice && gPermission['dcom:assetsManager:assetsOverview:batch:matchPosition']"
          type="primary"
          size="small"
          @click="onPositionCanceAllCHandel"
        >取消定位</el-button>
      </section>
      <section
        :class="{ singleDevice: singleDevice.isSingleDevice, nosingleDevice: !singleDevice.isSingleDevice }"
      >
        <common-table
          ref="table"
          @rowClick="rowClick"
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
            <template
              v-slot="scope"
              v-if="gPermission['dcom:assetsManager:assetsOverview:batch:matchPosition']"
            >
              <el-button
                v-show="[1, '1'].includes(scope.row.positionStatus)"
                @click.stop="onPositionCancel(scope.row)"
                type="text"
                size="small"
              >取消定位</el-button>
              <el-button
                v-show="[0, '0'].includes(scope.row.positionStatus)"
                @click.stop="onPosition(scope.row)"
                type="text"
                size="small"
              >定位</el-button>
            </template>
          </el-table-column>
        </common-table>
      </section>
    </div>
  </div>

  <aside v-if="showRealTimeVal">
    <common-dialog showFooter title="实时值" width="80%" @handle-cancel="showRealTimeVal = false">
      <template #content>
        <common-table
          ref="realTimeTable"
          :config="realTimeConfig"
          :dealListData="realTimeValDealListData"
          :cellStyleFn="() => {}"
        ></common-table>
      </template>
      <template #footer>
        <div class="x-btn-group">
          <el-button
            v-if="gPermission['dcom:assetsManager:cabinetsOverview:collectorDeviceManage']"
            @click="toHref"
            size="mini"
            type="primary"
          >采集器管理</el-button>
          <el-button @click="showRealTimeVal = false" size="mini">取消</el-button>
        </div>
      </template>
    </common-dialog>
  </aside>

  <aside v-if="showMultiplePosition">
    <common-dialog
      showFooter
      title="批量定位"
      width="400px"
      @handle-cancel="showMultiplePosition = false"
    >
      <template #content>
        <el-input v-model="uSpaceInput" placeholder="请输入定位 u 位, 以逗号分隔" />
      </template>
      <template #footer>
        <div class="x-btn-group">
          <el-button @click="onConfirm" size="mini" type="primary">确定</el-button>
          <el-button @click="showMultiplePosition = false" size="mini">取消</el-button>
        </div>
      </template>
    </common-dialog>
  </aside>

  <!-- it设备详情 -->
  <aside v-if="showItDeviceDetail">
    <common-dialog fullscreen @handle-cancel="showItDeviceDetail = false">
      <template #content>
        <div style="height:100%; overflow:hidden;">
          <it-device-detail
            :isDialog="true"
            :dialogResourceId="dialogResourceId"
            :dialogSn="dialogSn"
            :dialogType="dialogType"
            :number="dialogNumber"
            :dialogDeviceId="dialogDeviceId"
          ></it-device-detail>
        </div>
      </template>
    </common-dialog>
  </aside>

  <el-dialog
    v-model="showPerDialog"
    :modal="false"
    :fullscreen="false"
    width="25%"
    custom-class="per-dialog"
    :title="PerResultObj.progressTips"
    :before-close="clearPreData"
  >
    <el-progress
      v-if="showPerDialog"
      :stroke-width="15"
      :text-inside="true"
      :percentage="PerResultObj.percentage"
      :color="customColors"
    ></el-progress>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="clearPreData">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import CabinetView from './lightBeltCabinet';
import CommonTable from './CommonTable';
import CommonDialog from '@/component/elComponent/CommonDialog';
import { getMonitInfo, getCIList, doPosition, getImgByName, getUSpacesListStatus, getPorcessByKey } from '@/api/model';
import { deepClonePlus, uuidv4 } from '@/utils/tool';
import { U_LIST } from './formEnum';
import axios from 'axios';

export default {
  components: {
    CabinetView,
    CommonTable,
    CommonDialog,
  },
  inject: {
    gPermission: {
      default: () => ({}),
    },
  },
  props: {
    cabinetNumber: String,
    zctID: String,
    isBindZct: {
      type: String,
      default: '0',
    },
  },
  data: function () {
    return {
      showPerDialog: false,
      PerResultObj: {
        percentage: 0,
        progressTips: '正在加载中，请耐心等候',
      },
      customColors: [
        { color: '#e6a23c', percentage: 20 },
        { color: '#f56c6c', percentage: 40 },
        { color: '#1989fa', percentage: 60 },
        { color: '#6f7ad3', percentage: 80 },
        { color: '#5cb87a', percentage: 100 },
      ],
      handelType: '',
      singleDeviceImg: require('./img/singleDeviceImg.png').default,
      showRealTimeVal: false,
      showMultiplePosition: false,
      showItDeviceDetail: false,
      deviceObj: {},
      deviceList: [],
      uList: [],
      uListHistory: [],
      rowUSpaceList: [],
      uSpaceInput: '',
      tsdbData: {
        upperTemperature: '', // 上温度
        middleTemperature: '', // 中温度（独体展示一个温度，取这个）
        downTemperature: '2', // 下温度
        middleHumidity: '', // 湿度
        connectionStatus: '', // 通讯状态
      },
      warningUSpaceList: [], // 告警 u位
      singleDevice: {},
      collectorLocation: '',
      config: {
        showSelection: false,
        showIndex: false,
        columns: [
          {
            prop: 'pathTranslated',
            label: '设备位置',
          },
          {
            prop: 'serial_num',
            label: '序列号',
            showTooltip: true,
          },
          {
            prop: 'deviceInfoName',
            label: '设备类型',
            showTooltip: true,
          },
          {
            prop: 'monitoringInfo',
            label: '监控信息',
            showTooltip: true,
          },
          {
            prop: 'physicalStatus',
            label: '物理状态',
            showTooltip: true,
          },
        ],
      },
      realTimeConfig: {
        showSelection: false,
        showIndex: false,
        columns: [
          {
            prop: 'ID',
            label: 'ID',
          },
          {
            prop: 'name',
            label: '名称',
            showTooltip: true,
          },
          {
            prop: 'value',
            label: '当前值',
            showTooltip: true,
          },
          {
            prop: 'status',
            label: '当前状态',
            showTooltip: true,
          },
          {
            prop: 'time',
            label: '数据时间',
            showTooltip: true,
          },
        ],
      },
      lightConfig: {},
      dialogResourceId: '',
      dialogType: 'itDevice',
      dialogSn: '',
      dialogNumber: '',
      dialogDeviceId: '',
    };
  },
  watch: {
    cabinetNumber(value) {
      this.$refs.table.refreshTableData();
      this.warningUSpaceList = [];
    },
  },
  methods: {
    rowClick(row, column, event) {
      if (row.resourceId) {
        this.dialogResourceId = row.resourceId;
        this.showItDeviceDetail = true;
        this.dialogSn = row.startU;
        this.dialogNumber = row.pathTranslated.split(':')[0];
        this.dialogDeviceId = row.deviceId;
      }
      console.log(row, column, event);
    },
    // 监控信息列表
    dealListData(page, pageSize, sortObj) {
      // isBindZct=0 为没有绑定资产条，没有绑定不展示设备
      if (!this.cabinetNumber && [0, '0'].includes(this.isBindZct)) {
        return new Promise((res, rej) => {
          this.uList = U_LIST.reverse();
          res({ total: 0, data: [] });
        });
      }
      return new Promise((res, rej) => {
        getMonitInfo({ number: this.cabinetNumber }).then(
          ({ data, total }) => {
            const { isSingleDevice, singleDeviceImageName, tsdbData, collectorLocation, deviceList, uList, lightConfig } = data;
            this.collectorLocation = collectorLocation;
            // 是否是独体设备
            this.singleDevice = { isSingleDevice: [1, '1'].includes(isSingleDevice), singleDeviceImageName, singleDeviceImageUrl: '' };
            // 灯带配置信息 {}
            this.lightConfig = lightConfig;
            // 进风数据 []
            this.tsdbData = tsdbData;
            // 设备 []
            this.deviceList = deviceList;

            // 正常设备
            if (!this.singleDevice.isSingleDevice) {
              // 告警 u 位 []
              this.warningUSpaceList = uList.filter(it => [1, '1'].includes(it.isAlarmBgC)).map(it => Number(it.sn));
              // 设备对象 { pathTranslated : {设备对象}, ...}
              this.deviceObj = this.deviceList.reduce((obj, curr, inx) => {
                // 0: 正常綁定
                // 1: 末绑定
                // 2: 非法在架
                // 3: 设备尹失
                // 4: 位置错误
                // 放入 正常绑定的设备 和 告警设备
                if ([0, '0'].includes(curr.monitoringCode) || this.warningUSpaceList.includes(curr.startU)) {
                  uList[Number(curr.startU) - 1].pathTranslated = curr.pathTranslated;
                  obj[curr.pathTranslated] = { ...curr };
                }
                return obj;
              }, {});
              console.log('--------------');
              console.log(this.deviceObj);
              console.log(this.warningUSpaceList);
              console.log('--------------');

              // u位数据 []
              this.uList = uList
                .filter(it => {
                  [5, '5'].includes(it.sn) ? (it.temperature = tsdbData.downTemperature) : null;
                  [22, '22'].includes(it.sn) ? (it.temperature = tsdbData.middleTemperature) : null;
                  [40, '40'].includes(it.sn) ? (it.temperature = tsdbData.upperTemperature) : null;
                  return it;
                })
                .reverse();
            }

            // 设置最初灯带状态
            // this.uListHistory = deepClonePlus(this.uList);

            // fix: 此处先不获取接口
            // if (this.singleDevice.isSingleDevice) {
            //   // 获取独体设备背景图片
            //   this.getSingleDeviceImg();
            // } else {
            //   // 获取设备背景图片
            //   this.getDeviceListImg();
            // }

            res({ total, data: deviceList || [] });
          },
          err => {
            res({ total: 0, data: [] });
          }
        );
      });
    },
    async getDeviceListImg() {
      for (const key in this.deviceObj) {
        const deviceItem = this.deviceObj[key];
        try {
          const res = await axios.post(
            '/umonitor/cabinet/device/background/image',
            {
              name: deviceItem.ImageName,
              type: 'device',
            },
            {
              responseType: 'blob', // 划重点了，这个很重要
              headers: {
                token: localStorage.getItem('sid'),
              },
            }
          );
          console.log(res);
          let blob = new Blob([res.data], { type: 'image/png' });
          deviceItem.bgUrl = window.URL.createObjectURL(blob); // 转换为blob格式;
          console.log('转换后地址：', deviceItem.bgUrl);
        } catch (error) {
          deviceItem.bgUrl = 'http://mms0.baidu.com/it/u=3243539008,1847486036&fm=253&app=138&f=PNG&fmt=auto&q=75?w=500&h=209';
          console.log(error);
        }
      }
    },
    async getSingleDeviceImg() {
      // 独体图片获取
      // this.singleDevice.singleDeviceImageUrl =
      //   'http://mms2.baidu.com/it/u=3470424931,3078882800&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=500&h=632';
      try {
        const res = await axios.post(
          '/umonitor/cabinet/device/background/image',
          {
            name: this.singleDevice.singleDeviceImageName,
            type: 'cabinet',
          },
          {
            responseType: 'blob', // 划重点了，这个很重要
            headers: {
              token: localStorage.getItem('sid'),
            },
          }
        );
        console.log(res);
        let blob = new Blob([res.data], { type: 'image/png' });
        this.singleDevice.singleDeviceImageUrl = window.URL.createObjectURL(blob); // 转换为blob格式;
        console.log('转换后地址：', this.singleDevice.singleDeviceImageUrl);
      } catch (error) {
        this.singleDevice.singleDeviceImageUrl = 'http://mms0.baidu.com/it/u=3243539008,1847486036&fm=253&app=138&f=PNG&fmt=auto&q=75?w=500&h=209';
        console.log(error);
      }
    },
    // 查看实时值列表
    realTimeValDealListData(page, pageSize, sortObj) {
      return new Promise((res, rej) => {
        getCIList({
          zct_id: this.zctID, // 资产条id
          number: page, // 页数
          size: pageSize, // 每页大小
        }).then(
          ({ data, total }) => {
            res({ total, data });
          },
          err => {
            res({ total: 0, data: [] });
          }
        );
      });
    },
    onPosition(row) {
      const uuid = uuidv4();
      this.getPorcessStatusByKey(uuid);
      this.showPerDialog = true;

      const params = {
        cabinetNumber: this.cabinetNumber, // 所在机柜编号
        unitList: [], // 定位的起始U位
        status: 1, // 定位为1，取消定位为0
        resourceId: [],
      };
      if (row.resourceId) {
        params.resourceId = [row.resourceId];
      } else {
        params.unitList = [row.startU];
      }
      doPosition(params, uuid).then(
        ({ status }) => {
          if (status === 200) {
            this.$refs.table.refreshTableData();
            row.positionStatus = 1;
            this.$message.success('操作成功');
          } else {
            this.$message.error('定位失败');
          }
        },
        err => {
          console.log(err);
        }
      );
      console.log('定位');
    },
    onPositionCancel(row) {
      const uuid = uuidv4();
      this.getPorcessStatusByKey(uuid);
      this.showPerDialog = true;

      const params = {
        cabinetNumber: this.cabinetNumber, // 所在机柜编号
        unitList: [], // 定位的起始U位
        status: 0, // 定位为1，取消定位为0
        resourceId: [],
      };
      if (row.resourceId) {
        params.resourceId = [row.resourceId];
      } else {
        params.unitList = [row.startU];
      }
      doPosition(params, uuid).then(
        ({ status }) => {
          if (status === 200) {
            this.$refs.table.refreshTableData();
            row.positionStatus = 0;
            this.$message.success('操作成功');
          } else {
            this.$message.error('定位失败');
          }
        },
        err => {
          console.log(err);
        }
      );
      console.log('取消定位');
    },
    toHref() {
      console.log(`跳转 =>  /page/collector/engineering.html?resource_id=${this.collectorLocation}`);
      location.href = `/page/collector/engineering.html?resource_id=${this.collectorLocation}`;
    },
    onPositionAllHandel() {
      this.handelType = 'onPositionAll';
      this.showMultiplePosition = true;
      this.uSpaceInput = '';
    },
    onPositionCanceAllCHandel() {
      this.handelType = 'onPositionAllCancel';
      this.showMultiplePosition = true;
      this.uSpaceInput = '';
    },
    onConfirm() {
      if (this.handelType === 'onPositionAll') {
        this.onPositionAll();
      } else {
        this.onPositionAllCancel();
      }
    },
    onPositionAll() {
      const uuid = uuidv4();
      this.getPorcessStatusByKey(uuid);
      this.showPerDialog = true;

      let uSpaceInputArr = this.uSpaceInput.split(',').map(it => Number(it));

      doPosition(
        {
          cabinetNumber: this.cabinetNumber, // 所在机柜编号
          unitList: uSpaceInputArr, // 定位的起始U位
          status: 1, // 定位为1，取消定位为0
          resourceId: [],
        },
        uuid
      )
        .then(
          ({ status }) => {
            if (status === 200) {
              this.$refs.table.refreshTableData();
              this.$message.success('操作成功');
            } else {
              this.$message.error('定位失败');
            }
          },
          err => {
            this.$message.error('定位失败');
            console.log(err);
          }
        )
        .finally(() => {
          this.showMultiplePosition = false;
        });
      console.log('定位全部');
    },
    onPositionAllCancel() {
      const uuid = uuidv4();
      this.getPorcessStatusByKey(uuid);
      this.showPerDialog = true;

      let uSpaceInputArr = this.uSpaceInput.split(',').map(it => Number(it));

      doPosition(
        {
          cabinetNumber: this.cabinetNumber, // 所在机柜编号
          unitList: uSpaceInputArr, // 定位的起始U位
          status: 0, // 定位为1，取消定位为0
          resourceId: [],
        },
        uuid
      )
        .then(
          ({ status }) => {
            if (status === 200) {
              this.$refs.table.refreshTableData();
              this.$message.success('操作成功');
            } else {
              this.$message.error('取消定位失败');
            }
          },
          err => {
            this.$message.error('取消定位失败');
            console.log(err);
          }
        )
        .finally(() => {
          this.showMultiplePosition = false;
        });
      console.log('取消定位');
    },
    getPorcessStatusByKey(uuid) {
      try {
        getPorcessByKey(uuid)
          .then(({ data, status }) => {
            if (status === 200) {
              this.PerResultObj.percentage = data.data;
              this.PerResultObj.progressTips = data.details;
              if (Number(data.data) !== 100) {
                setTimeout(() => {
                  this.getPorcessStatusByKey(uuid);
                }, 1000);
              }
            } else {
              this.$message.error(data.details);
              this.clearPreData();
            }
            if (Number(this.PerResultObj.percentage) === 100 || this.PerResultObj.percentage === '') {
              this.clearPreData();
            }
          })
          .catch(err => {
            this.$message.error('下载失败！');
            this.clearPreData();
          });
      } catch (error) {
        console.log(error);
      }
    },
    clearPreData() {
      this.showPerDialog = false;
      this.PerResultObj.percentage = 0;
      this.PerResultObj.progressTips = '正在加载中，请耐心等候';
    },
    getUSpacesListStatusRequest() {
      getUSpacesListStatus({ number: '' })
        .then(({ data, status }) => {
          if (status === 200) {
            // this.uList = data.reverse();
          }
        })
        .catch(err => {
          console.log(err);
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
