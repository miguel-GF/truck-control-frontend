import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: import("../views/HomeView.vue"),
  },
  {
    path: "/operadores",
    name: "operadores",
    component: () => import("../views/OperadorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
