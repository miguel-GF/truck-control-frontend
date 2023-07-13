<template>
  <TheHeader
    placeholder="Buscar por Clave / Nombre"
    @buscar="filtrar"
    @agregar="agregar()"
  />
  <!-- <el-container> -->
  <!-- Ajusta la altura según tus necesidades -->
  <el-row>
    <el-col :span="24">
      <OperadorList />
    </el-col>
  </el-row>
  <!-- </el-container> -->
</template>

<script setup>
import OperadorList from "./OperadorList.vue";
import TheHeader from "../../components/TheHeader.vue";
import { useOperadorStore } from "@/stores/operadorStore.js";
const useOperadores = useOperadorStore();
const { filtrarListar } = useOperadores;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const agregar = () => console.log("agregar");
</script>
