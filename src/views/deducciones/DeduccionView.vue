<template>
  <TheHeader
    titulo="Deducciones"
    placeholder="Buscar por Folio / Nombre / Operador"
    @buscar="filtrar"
    @agregar="abrirAgregar()"
  />
  <el-row>
    <el-col :span="24">
      <DeduccionList />
    </el-col>
  </el-row>
  <AgregarModal :mostrar="mostrarAgregar" @cerrar="mostrarAgregar = false" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "@/importsVue";
import DeduccionList from "./DeduccionList.vue";
const AgregarModal = defineAsyncComponent(() =>
  import("./modales/DeduccionAgregarModal.vue")
);
import { useDeduccionStore } from "@/stores/deduccionStore.js";
const mostrarAgregar = ref(false);
const useDeduccion = useDeduccionStore();
const { filtrarListar } = useDeduccion;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
</script>
