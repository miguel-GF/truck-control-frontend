<template>
  <router-link :to="props.ruta" :class="[{ 'txt-decoration-none': isMobile }]">
    <el-menu-item :index="props.index" :class="[{ 'item-active': rutaActiva }]">
      <!-- <el-icon><component :is="props.icono" /></el-icon> -->
      <el-icon size="20">
        <i :class="props.icono"></i>
      </el-icon>
      <template #title>
        {{ props.titulo || "--" }}
      </template>
    </el-menu-item>
  </router-link>
</template>

<script setup>
import { defineProps } from "@/importsVue";
const props = defineProps({
  index: {
    type: String,
    default: "0",
  },
  titulo: {
    type: String,
    default: "",
  },
  icono: {
    required: true,
  },
  ruta: {
    type: String,
    default: "/",
  },
  rutaActiva: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" #scope>
.item-active {
  background-color: $background-primary;
}
</style>
