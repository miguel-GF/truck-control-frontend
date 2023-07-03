import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import es from "element-plus/dist/locale/es.mjs";
import { showLoading } from "./globalProperties/loader";

const app = createApp(App);
app.use(ElementPlus, {
  locale: es,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.config.globalProperties.$showLoading = showLoading;
app.mount("#app");
