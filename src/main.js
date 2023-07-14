import { createApp, defineAsyncComponent } from "@/importsVue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import es from "element-plus/dist/locale/es.mjs";
import VueTheMask from "vue-the-mask";
import { showLoading } from "./globalProperties/loader";
import { get, post, del, patch } from "./api/api";
// Componentes
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import TheHeader from "./components/TheHeader.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(ElementPlus, {
  locale: es,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const TheDrawer = defineAsyncComponent(() =>
  import("./components/TheDrawer.vue")
);
app.component(TheDrawer);
app.component(TheHeader);
app.use(router);
app.use(pinia);
app.use(VueTheMask);
// Servicios globales
app.provide("$showLoading", showLoading);

// Propiedades globales
app.config.globalProperties.$showLoading = showLoading;
app.config.globalProperties.$http = {
  get,
  post,
  del,
  patch,
};

app.mount("#app");
