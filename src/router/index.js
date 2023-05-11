import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";

export const routes = [
  {
    path: "/",
    component: () => import("@/view/menuTool.vue"),
  },
  {
    path: "/overview",
    name: 'overview',
    label: '总览',
    component: () => import("@/view/overview/index.vue"),
  },
  {
    path: "/lightBelt",
    name: 'lightBelt',
    label: '灯带展示',
    component: () => import("@/view/lightBelt/index.vue"),
  },
  {
    path: "/inventoryAnalysis",
    name: 'inventoryAnalysis',
    label: '盘点分析',
    component: () => import("@/view/inventoryAnalysis/index.vue"),
  },
  {
    path: "/roomInventory",
    name: 'roomInventory',
    label: '机房盘点',
    component: () => import("@/view/roomInventory/index.vue"),
  },
  {
    path: "/roomInventory/detail/:id",
    name: 'roomInventoryDetail',
    label: '机房盘点-详情',
    component: () => import("@/view/roomInventory/detail/index.vue"),
  },
  {
    path: "/alarmDevice",
    name: 'alarmDevice',
    label: '告警设备列表',
    component: () => import("@/view/alarmDevice/index.vue"),
  },
  {
    path: "/404",
    component: require("@/view/404.vue").default,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to, from) => {
  NProgress.done();
});
export default router;