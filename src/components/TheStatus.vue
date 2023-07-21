<template>
  <el-tag class="tag-status" :type="obtenerTipo" effect="dark">
    {{ props.statusNombre }}
  </el-tag>
</template>

<script setup>
import { defineProps, computed } from "@/importsVue";
const props = defineProps({
  status: {
    type: Number,
    default: 0,
  },
  statusNombre: {
    type: String,
    default: "",
  },
});
const obtenerTipo = computed(() => {
  switch (props.status) {
    case 100:
      return "warning";
    case 300:
      return "danger";
    case 400:
      return "info";
    default:
      return "success";
  }
});
</script>
