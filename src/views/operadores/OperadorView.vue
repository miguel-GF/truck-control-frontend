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
  <AgregarModal :mostrar="mostrarAgregar" @cerrar="mostrarAgregar = false" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "@/importsVue";
import OperadorList from "./OperadorList.vue";
const AgregarModal = defineAsyncComponent(() =>
  import("./modales/OperadorAgregarModal.vue")
);
import { useOperadorStore } from "@/stores/operadorStore.js";
const mostrarAgregar = ref(false);
const useOperador = useOperadorStore();
const { filtrarListar } = useOperador;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
</script>
