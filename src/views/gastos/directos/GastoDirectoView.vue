<template>
  <TheHeader
    titulo="Gastos Directos"
    placeholder="Buscar por Folio / Nombre / Operador"
    @buscar="filtrar"
    @agregar="abrirAgregar()"
  />
  <el-row>
    <el-col :span="24">
      <GastoDirectoList />
    </el-col>
  </el-row>
  <AgregarModal :mostrar="mostrarAgregar" @cerrar="mostrarAgregar = false" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "@/importsVue";
import GastoDirectoList from "./GastoDirectoList.vue";
const AgregarModal = defineAsyncComponent(() =>
  import("./modales/GastoDirectoAgregarModal.vue")
);
import { useGastoDirectoStore } from "@/stores/gastoDirectoStore.js";
const mostrarAgregar = ref(false);
const useGasto = useGastoDirectoStore();
const { filtrarListar } = useGasto;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
</script>
