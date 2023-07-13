<template>
  <el-container>
    <el-row>
      <TheHeader
        class="header-view"
        placeholder="Buscar por Clave / Nombre"
        @buscar="filtrar"
        @agregar="agregar()"
      />
      <!-- <el-scrollbar style="height: calc(100vh - 460px)"> -->
      <!-- Ajusta la altura según tus necesidades -->
      <el-col :span="24">
        <OperadorList />
      </el-col>
      <!-- </el-scrollbar> -->
    </el-row>
  </el-container>
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
