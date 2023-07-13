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
  <TheDrawer
    titulo="Agregar operador"
    :mostrar="mostrarAgregar"
    @cerrar="mostrarAgregar = false"
    @aceptar="agregarOperador"
    class="custom-title"
  >
    <template #body> hola</template>
  </TheDrawer>
</template>

<script setup>
import OperadorList from "./OperadorList.vue";
import { ref } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
const mostrarAgregar = ref(false);
const useOperadores = useOperadorStore();
const { filtrarListar } = useOperadores;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
const agregarOperador = () => console.log("Agregar operador");
</script>
