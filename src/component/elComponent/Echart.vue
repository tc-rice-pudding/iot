<template>
  <div ref="chartRef" class="echart"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { ref, toRef, watch, onBeforeUnmount, onMounted } from 'vue';

import chinaMap from './china.json';

export default {
  props: {
    option: Object,
  },
  setup(props, ctx) {
    const option = toRef(props, 'option');
    const chartRef = ref(null);
    let _chart = null;
    echarts.registerMap('china', chinaMap);
    watch(option, () => {
      _chart && _chart.setOption(option.value);
    });
    let _resizeTimeout;
    const handleResize = () => {
      clearTimeout(_resizeTimeout);
      _resizeTimeout = setTimeout(() => {
        _chart && _chart.resize();
      }, 100);
    };
    onMounted(() => {
      _chart = echarts.init(chartRef.value, 'dark');
      _chart.setOption({
        backgroundColor: 'transparent',
      });
      _chart.setOption(option.value);
      _chart.on('click', e => ctx.emit('oneclick', e));
      _chart.on('dblclick', e => ctx.emit('dblclick', e));
      window.addEventListener('resize', handleResize);
    });
    onBeforeUnmount(() => {
      _chart.dispose();
      window.removeEventListener('resize', handleResize);
    });
    return {
      chartRef,
      getChart: () => _chart,
      handleResize,
    };
  },
};
</script>

<style lang="less" scoped>
.echart {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
