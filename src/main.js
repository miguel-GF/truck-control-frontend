import { createApp, defineAsyncComponent } from "@/importsVue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import es from "element-plus/dist/locale/es.mjs";
import VueTheMask from "vue-the-mask";
// Config http
import { get, post, del, patch } from "./api/api";
// Global properties
import { showLoading } from "./globalProperties/loader";
import { mostrarMensaje } from "./globalProperties/message";
import { validarInputNoObligatorio } from "./globalProperties/input";
import { formatearNumero } from "./globalProperties/format";
// Componentes
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import TheHeader from "./components/TheHeader.vue";
import ContainerTabsLayout from "./components/layouts/ContainerTabsLayout.vue";
import TheRowInfo from "./components/TheRowInfo.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(ElementPlus, {
  locale: es,
});
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
const TheDrawer = defineAsyncComponent(() =>
  import("./components/TheDrawer.vue")
);
const TheDialog = defineAsyncComponent(() =>
  import("./components/TheDialog.vue")
);
const TheStatus = defineAsyncComponent(() =>
  import("./components/TheStatus.vue")
);
// const ContainerTabsLayout = defineAsyncComponent(() =>
//   import("./components/layouts/ContainerTabsLayout.vue")
// );
app.component(TheDrawer);
app.component(TheHeader);
app.component(TheDialog);
app.component(TheStatus);
app.component(ContainerTabsLayout);
app.component(TheRowInfo);
app.use(router);
app.use(pinia);
app.use(VueTheMask);
// Servicios globales
app.provide("$showLoading", showLoading);
app.provide("$mostrarMensaje", mostrarMensaje);
app.provide("$formatearNumero", formatearNumero);
// Propiedades globales
app.config.globalProperties.$http = {
  get,
  post,
  del,
  patch,
};
app.config.globalProperties.$showLoading = showLoading;
app.config.globalProperties.$mostrarMensaje = mostrarMensaje;
app.config.globalProperties.$validarInputNoObligatorio =
  validarInputNoObligatorio;
app.config.globalProperties.$formatearNumero = formatearNumero;

app.mount("#app");
