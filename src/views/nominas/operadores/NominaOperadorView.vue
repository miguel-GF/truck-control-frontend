<template>
  <TheHeader
    titulo="Nómina Operadores"
    placeholder="Buscar por Folio"
    @buscar="filtrar"
    @agregar="abrirAgregar()"
  />
  <el-row>
    <el-col :span="24">
      <NominaOperadorList />
    </el-col>
  </el-row>
  <AgregarModal :mostrar="mostrarAgregar" @cerrar="mostrarAgregar = false" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "@/importsVue";
import NominaOperadorList from "./NominaOperadorList.vue";
const AgregarModal = defineAsyncComponent(() =>
  import("./modales/NominaOperadorAgregarModal.vue")
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
