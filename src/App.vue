<template>
  <el-container class="layout">
    <el-container>
      <!-- <el-aside class="el-aside" width="200px">Aside</el-aside> -->
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        :collapse="true"
      >
        <!--<el-sub-menu index="1">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
        <template v-for="(opc, i) in menuOpciones" :key="i">
          <ItemMenu
            :titulo="opc.titulo"
            :index="String(i)"
            :icono="opc.icono"
            :ruta="opc.ruta"
          />
        </template>
      </el-menu>
      <el-drawer v-model="drawer" title="Menu" direction="ltr" size="20%">
        <div class="cursor-pointer">
          <el-row justify="space-between">
            <el-col :span="4">
              <el-icon>
                <UserFilled />
              </el-icon>
            </el-col>
            <el-col :span="20">2</el-col>
          </el-row>
        </div>
      </el-drawer>
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
import { ref, shallowRef } from "vue";
import { ElIcon } from "element-plus";
import { HomeFilled, UserFilled } from "@element-plus/icons-vue";
import ItemMenu from "./components/ItemMenu.vue";
const drawer = ref(false);
const userFilledRef = shallowRef(UserFilled);
const homeFilledRef = shallowRef(HomeFilled);
const menuOpciones = ref([
  { titulo: "Home", icono: homeFilledRef, ruta: "/" },
  { titulo: "Operadores", icono: userFilledRef, ruta: "/operadores" },
]);
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
