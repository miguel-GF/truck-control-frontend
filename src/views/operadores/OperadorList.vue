<script setup>
import { useOperadorStore } from "@/stores/operadorStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref } from "@/importsVue";

const useOperadores = useOperadorStore();
const { operadores } = storeToRefs(useOperadores);
const { listar } = useOperadores;
const showLoading = inject("$showLoading");

onBeforeMount(async () => {
  try {
    showLoading(true);
    await listar();
  } catch (error) {
    //
  } finally {
    showLoading(false);
  }
});
</script>

<template>
  <template v-for="operador in operadores" :key="operador.id">
    <el-row :span="24">
      {{ operador.nombre || "--" }}
    </el-row>
  </template>
</template>
