import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Single from "../views/Single.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/single",
    name: "Single",
    component: Single,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
