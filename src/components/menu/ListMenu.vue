<template>
  <el-menu
    default-active="0"
    :collapse="!props.isMobile"
    :class="[{ 'no-border': isMobile }]"
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
        :isMobile="props.isMobile"
      />
    </template>
  </el-menu>
</template>

<script setup>
import { ref, shallowRef, defineProps } from "vue";
import { HomeFilled, UserFilled } from "@element-plus/icons-vue";
import ItemMenu from "./ItemMenu.vue";
const userFilledRef = shallowRef(UserFilled);
const homeFilledRef = shallowRef(HomeFilled);
const menuOpciones = ref([
  { titulo: "Home", icono: homeFilledRef, ruta: "/" },
  { titulo: "Operadores", icono: userFilledRef, ruta: "/operadores" },
]);
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});
</script>
