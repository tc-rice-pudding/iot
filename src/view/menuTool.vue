<template>
  <div style="padding: 20px; height: calc(100% - 40px); overflow-y: auto">
    <el-button
      :type="['primary', 'success', 'info', 'warning', 'danger'][inx%5]"
      size="small"
      v-for="(route, inx) in routeList"
      :key="route.path"
      @click="openNewTab(route.path)"
      >{{ route.label }}</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from "vue";
import { routes } from "@/router/index";

export default defineComponent({
  setup() {
    const openNewTab = (path: string) => window.open(`/#${path}`, "_blank");
    const routeList = routes.filter((route) => Reflect.has(route, "name"));

    return { openNewTab, routeList };
  },
});
</script>
<style lang="less" scoped>
.hidetarget {
  width: 0;
  height: 0;
}
</style>
