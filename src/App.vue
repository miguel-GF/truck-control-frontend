<template>
  <el-container class="layout">
    <el-container>
      <!-- <el-aside class="el-aside" width="200px">Aside</el-aside> -->
      <TheDrawer
        v-if="isMobile"
        titulo="Menu"
        :mostrar="drawer"
        :mostrarFooter="false"
        @cerrar="cerrar"
      >
        <template #body><ListMenu :isMobile="isMobile" /></template>
      </TheDrawer>
      <ListMenu v-else />
      <el-container class="container-app">
        <el-header class="el-header">
          <el-row :justify="!isMobile ? 'end' : 'space-between'">
            <el-icon
              @click="drawer = !drawer"
              class="cursor-pointer hidden-sm-and-up"
            >
              <Expand />
            </el-icon>
            <el-icon class="cursor-pointer">
              <More />
            </el-icon>
          </el-row>
        </el-header>
        <el-main class="el-main">
          <router-view />
        </el-main>
        <el-footer class="el-footer d-end" height="24px">
          <div>Footer 2023</div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { useAppStore } from "@/stores/appStore.js";
import { ref, onMounted, onBeforeUnmount } from "@/importsVue";
import ListMenu from "./components/menu/ListMenu.vue";
const useApp = useAppStore();
const { setIsMobile } = useApp;
const drawer = ref(false);
const isMobile = ref(false);
const cerrar = () => {
  drawer.value = false;
};
const checkMobile = async () => {
  isMobile.value = window.innerWidth <= 768;
  await setIsMobile(window.innerWidth <= 768);
};
onMounted(() => {
  window.addEventListener("resize", checkMobile);
  checkMobile();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
  isMobile.value = false;
});
</script>

<style lang="scss" #scope>
// .el-aside {
//   background-color: $background;
// }

.el-footer {
  background-color: $background;
}

.el-header {
  background-color: $background;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px !important;
}

/* Distribuye el espacio restante horizontalmente */
.el-header .el-row {
  flex-grow: 1;
}

.el-main {
  padding: 0 !important;
}

.layout {
  height: 100vh;
}
</style>
