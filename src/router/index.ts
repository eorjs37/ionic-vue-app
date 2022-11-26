import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tab1",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/tab1",
    name: "tab1",
    component: () => import("@/views/tabs/Tab1Page.vue"),
  },
  {
    path: "/tab2",
    component: () => import("@/views/tabs/Tab2Page.vue"),
  },
  {
    path: "/tab3",
    component: () => import("@/views/tabs/Tab3Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
