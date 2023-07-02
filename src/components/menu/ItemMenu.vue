<template>
  <router-link :to="props.ruta">
    <el-menu-item :index="props.index">
      <el-icon><component :is="props.icono" /></el-icon>
      <template #title>
        {{ props.titulo || "--" }}
      </template>
    </el-menu-item>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
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
});
</script>
