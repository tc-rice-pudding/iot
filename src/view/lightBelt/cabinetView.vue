<template>
  <div class="viewcabinet-box">
    <!-- viewcabinetInfo -->
    <div class="viewcabinet-info">
      <div class="cabinet-info-title">U位状态</div>
      <div class="cabinet-info-title ml40">
        <label class="viewcabinet-cabinet-uspace-label" />空闲
      </div>
      <div class="cabinet-info-title ml40">
        <label class="viewcabinet-caseused" />占用
      </div>

      <div class="cabinet-info-title">灯带状态</div>
      <div class="cabinet-info-title ml40" v-for="light in lightConfig" :key="light.color">
        <label :class="color2class[light.color]" />
        {{ light.label }}
      </div>
    </div>
    <div class="viewcabinet">
      <div class="viewcabinet-top" />
      <div v-for="uSpace in uList" :key="uSpace.sn" class="viewcabinet-middle">
        <!-- 5、22、40 温度计 -->
        <div
          v-if="[5, 22, 40, '5', '22', '40'].includes(uSpace.sn)"
          class="viewcabinet-item-left-wind"
        >{{ uSpace.temperature || '' }}</div>
        <div v-else class="viewcabinet-item-left-empty" />
        <!-- 机柜左边框 -->
        <div class="viewcabinet-item-left" />
        <!-- 中间 -->
        <el-tooltip
          :disabled="deviceObj[uSpace.pathTranslated]?.startU !== uSpace.sn"
          effect="light"
          placement="right"
        >
          <template #content>
            <span v-if="warningUSpaceList.includes(uSpace.sn)">
              <div>告警类型：{{deviceObj[uSpace.pathTranslated]?.monitoringInfo || ''}}</div>
              <div>序列号：{{ deviceObj[uSpace.pathTranslated]?.serial_num || '' }}</div>
              <div>标签编号：{{deviceObj[uSpace.pathTranslated]?.eic_num || '' }}</div>
            </span>
            <span v-else>
              <div>序列号：{{ deviceObj[uSpace.pathTranslated]?.serial_num || '' }}</div>
              <div>设备分类：{{ deviceObj[uSpace.pathTranslated]?.deviceInfoName || '' }}</div>
            </span>
          </template>
          <div class="viewcabinet-item">
            <!-- 告警设备 -->
            <div
              v-if="warningUSpaceList.includes(uSpace.sn)"
              style="height: 100%;"
              class="origin-div"
            />
            <!-- 正常设备 -->
            <div
              v-else-if="deviceObj[uSpace.pathTranslated] && Number(deviceObj[uSpace.pathTranslated].startU) === Number(uSpace.sn)"
              :style="{ height: `${deviceObj[uSpace.pathTranslated].uHeight}00%` }"
              :class="{ 'red-div': true, 'viewcabinet-bg': true }"
              :data-info="deviceObj[uSpace.pathTranslated].deviceInfo"
            />
            <!-- <div
              v-else-if="deviceObj[uSpace.pathTranslated] && Number(deviceObj[uSpace.pathTranslated].startU) === Number(uSpace.sn)"
              :style="{
                height: `${deviceObj[uSpace.pathTranslated].uHeight}00%`,
                'background-image': `url(${deviceObj[uSpace.pathTranslated].bgUrl})`,
                'background-size': 'cover',
              }"
              :class="{ 'red-div': true, 'viewcabinet-bg': true }"
              :data-info="deviceObj[uSpace.pathTranslated].deviceInfo"
            />-->
          </div>
        </el-tooltip>
        <!-- 机柜右边框 -->
        <div class="viewcabinet-item-right">
          <!-- 灯带 -->
          <div
            class="viewcabinet-item-light"
            :class="color2class[uSpace.lightStatus] || color2class['none']"
          />
        </div>
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        <div class="viewcabinet-item-floor">{{ uSpace.sn < 10 ? `0${uSpace.sn}` : uSpace.sn }}</div>
      </div>
      <div class="viewcabinet-bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name:'CabinetView',
  props: {
    lightConfigParam: {
      type: Array,
      default: () => [],
    },
    uList: {
      type: Array,
      default: () => [],
    },
    tsdbData: {
      type: Object,
      default: () => ({}),
    },
    deviceObj: {
      type: Object,
      default: () => ({}),
    },
    warningUSpaceList: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      lightConfig: {
        WARN: { label: '告警', color: 'red' },
        EMPTY: { label: '空闲', color: 'none' },
        USED: { label: '占用', color: 'blue' },
        PREUSED: { label: '预占', color: 'blueshanks' },
        POSITION: { label: '定位', color: 'redshanks' },
        OFFLINE: { label: '待下架', color: 'redandpurple' },
        ONLINE: { label: '待上架', color: 'blueandpurple' },
        REPIRE: { label: '待维修', color: 'purple' },
      },
      color2class: {
        none: 'viewcabinet-lightcolor-none',
        purple: 'viewcabinet-lightcolor-purple',
        blue: 'viewcabinet-lightcolor-blue',
        blueshanks: 'viewcabinet-lightcolor-blueshanks',
        blueandpurple: 'viewcabinet-lightcolor-blueandpurple',
        red: 'viewcabinet-lightcolor-red',
        redshanks: 'viewcabinet-lightcolor-redshanks',
        redandpurple: 'viewcabinet-lightcolor-redandpurple',
      },
    };
  },
  methods: {
    getPositionLightColor() {
      return this.lightConfig.POSITION.color;
    },
  },
  watch: {
    lightConfigParam(obj) {
      for (const key in obj) {
        if (key in this.lightConfig) {
          this.lightConfig[key].color = obj[key];
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.viewcabinet-box {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
}
.viewcabinet-info {
  height: 100%;
  width: 150px;
  .cabinet-info-title {
    line-height: 50px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    > label {
      margin-right: 10px;
    }
  }
  .ml40 {
    margin-left: 40px;
  }
}
.viewcabinet {
  height: 100%;
  width: 380px;
  margin-bottom: 20px;
}

.viewcabinet-top {
  margin-left: 41px;
  float: left;
  height: 19px;
  width: 276px;
  background: url(./img/cabinet-top.svg) center 0;
}
.viewcabinet-bottom {
  margin-left: 41px;
  float: left;
  height: 28px;
  width: 276px;
  background: url(./img/cabinet-bottom.svg) center 0;
}
.viewcabinet-middle {
  margin-left: 1px;
  float: left;
  width: 354px;
  height: 20px;
}

.viewcabinet-middle-content {
  padding-top: 1px;
}

.viewcabinet-item-left {
  float: left;
  height: 20px;
  width: 34px;
  background: url(./img/cabinet-left.svg);
}

.viewcabinet-item-left-wind {
  float: left;
  height: 30px;
  width: 50px;
  background: url(./img/cabinet-left-wind.svg) no-repeat;
  background-position: top;
  background-size: 60% 60%;
  line-height: 45px;
  text-align: center;
  margin-left: -10px;
}

.viewcabinet-item-left-empty {
  float: left;
  height: 20px;
  width: 40px;
}
.viewcabinet-bg {
  background-image: url(./img/1.1.2-1U-front.svg);
}
.viewcabinet-item {
  float: left;
  height: 20px;
  width: 202px;
  background: url(./img/cabinet-uspace.svg);
  position: relative;
  overflow: visible;
}

.viewcabinet-item-right {
  float: left;
  height: 20px;
  width: 40px;
  background: url(./img/cabinet-right.svg);
}

.viewcabinet-cabinet-uspace-label {
  background-image: url(./img/cabinet-uspace-label.png);
  width: 16px;
  height: 16px;
  float: left;
}
.viewcabinet-caseused {
  background-image: url(./img/caseused.png);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-none {
  background-image: url(./img/close.png);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-blue {
  background-image: url(./img/blue_always.png);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  float: left;
}

.viewcabinet-lightcolor-blueshanks {
  background-image: url(./img/blue_twinkle.gif);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-purple {
  background-image: url(./img/purple_always.png);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-purpleshanks {
  background-image: url(./img/purple_twinkle.gif);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-blueandpurple {
  background-image: url(./img/blue_purple_twinkle.gif);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-redandpurple {
  background-image: url(./img/red_purple_twinkle.gif);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-red {
  background-image: url(./img/red_always.png);
  width: 16px;
  height: 16px;
  float: left;
}

.viewcabinet-lightcolor-redshanks {
  background-image: url(./img/red_twinkle.gif);
  width: 16px;
  height: 16px;
  float: left;
}
.viewcabinet-item-light {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-left: 20px;
}
.viewcabinet-item-floor {
  float: left !important;
  height: 17px !important;
  width: 30px !important;
  color: black !important;
  background-color: #e1f1ff;
  font-size: 12px !important;
  text-align: center !important;
  margin-left: 0px !important;
  font-weight: bold !important;
  line-height: 20px !important;
  background: -webkit-gradient(linear, 0 0, 20 0, from(#fff), to(#e1f1ff)) !important;
  background: -moz-linear-gradient(left, #fff, #e1f1ff 65%) !important;
  transform: scale(0.7) !important;
}
.red-div {
  width: 100%;
  /* height: 100%; */
  opacity: 0.5;
  position: absolute;
  z-index: 2;
  bottom: 0;
  opacity: 1;
  border-top: 1px solid #e0f2f1;
  border-bottom: 1px solid #e0f2f1;
  /* background-repeat: round; */
}
.is-selected {
  z-index: 3 !important;
  background-color: #007aff !important;
  border: 2px solid #007aff !important;
}

.origin-div {
  width: 100%;
  background-color: #ff5500;
  opacity: 0.5;
  z-index: 2;
  position: absolute;
}
</style>
