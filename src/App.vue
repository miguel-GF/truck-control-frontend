<template>
  <el-container class="layout">
    <el-container>
      <!-- <el-aside class="el-aside" width="200px">Aside</el-aside> -->
      <TheDrawer :mostrar="drawer" @cerrar="cerrar" />
      <ListMenu />
      <el-container>
        <el-header class="el-header">
          <el-row justify="space-between">
            <el-icon @click="drawer = !drawer" class="cursor-pointer">
              <Expand />
            </el-icon>
            <el-icon class="cursor-pointer">
              <More />
            </el-icon>
          </el-row>
        </el-header>
        <el-main>
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
import { ref, defineAsyncComponent } from "vue";
import ListMenu from "./components/menu/ListMenu.vue";
const TheDrawer = defineAsyncComponent(() =>
  import("./components/TheDrawer.vue")
);
const drawer = ref(false);
const cerrar = () => {
  drawer.value = false;
};
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

.layout {
  height: 100vh;
}
</style>
