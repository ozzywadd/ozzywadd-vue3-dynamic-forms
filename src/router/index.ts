import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Single from "../views/Single.vue";
import Multi from "../views/Multi.vue";
import Demo from "../views/Demo.vue";
import DemoNew from "../views/DemoNew.vue";
import Yup from "../views/Yup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/single",
    name: "Single",
    component: Single,
  },
  {
    path: "/multi",
    name: "Multi",
    component: Multi,
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/demo-new",
    name: "DemoNew",
    component: DemoNew,
  },
  {
    path: "/yup",
    name: "Yup",
    component: Yup,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
