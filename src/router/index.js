import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/operadores",
    name: "operadores",
    component: () => import("../views/operadores/OperadorView.vue"),
  },
  {
    path: "/gastos/directos",
    name: "gastosDirectos",
    component: () => import("../views/gastos/directos/GastoDirectoView.vue"),
  },
  {
    path: "/nominas/operadores",
    name: "nominasOperadores",
    component: () =>
      import("../views/nominas/operadores/NominaOperadorView.vue"),
  },
  {
    path: "/nomina/operador/detalle/:id",
    name: "nominaOperadorDetalle",
    component: () =>
      import("../views/nominas/operadores/NominaOperadorDetalleView.vue"),
  },
  // Ruta por defecto para cualquier otra ruta que no coincide
  {
    path: "/:catchAll(.*)",
    redirect: "/", // Puedes cambiar esto a la ruta que desees como ruta por defecto
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
