<template>
  <router-link :to="props.ruta" :class="[{ 'txt-decoration-none': isMobile }]">
    <el-menu-item :index="props.index">
      <el-icon><component :is="props.icono" /></el-icon>
      <template #title>
        {{ props.titulo || "--" }}
      </template>
    </el-menu-item>
    <el-divider class="no-margin-divider" />
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
  isMobile: {
    type: Boolean,
    default: false,
  },
});
</script>
