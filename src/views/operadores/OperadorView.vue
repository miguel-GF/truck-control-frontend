<template>
  <TheHeader
    placeholder="Buscar por Clave / Nombre"
    @buscar="filtrar"
    @agregar="abrirAgregar()"
  />
  <el-row>
    <el-col :span="24">
      <OperadorList />
    </el-col>
  </el-row>
</template>

<script setup>
import OperadorList from "./OperadorList.vue";
import { ref } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
const mostrarAgregar = ref(false);
const useOperador = useOperadorStore();
const { filtrarListar } = useOperador;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
</script>
