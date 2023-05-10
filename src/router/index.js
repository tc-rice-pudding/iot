import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    redirect: '/lightBelt',
  },
  {
    path: "/lightBelt",
    component: () => import("@/view/lightBelt/index.vue"),
  },
  {
    path: "/roomInventory",
    component: () => import("@/view/roomInventory/index.vue"),
  },
  {
    path: "/roomInventory/detail/:id",
    component: () => import("@/view/roomInventory/detail/index.vue"),
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