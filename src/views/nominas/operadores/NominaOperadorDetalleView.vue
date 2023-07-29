<template>
  <TheHeader
    titulo="Detalle de Nómina Operadores"
    tipoVisualizacion="breadcrumbs"
    :breadcrumbs="breadcrumbs"
    @agregar="abrirAgregar()"
  >
    <template #acciones>
      <el-dropdown split-button type="primary" @click="recalcularNomina()">
        Recalcular
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Cerrar Nómina</el-dropdown-item>
            <el-dropdown-item @click="recalcularNomina()"
              >Recalcular</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </TheHeader>
  <ContainerTabsLayout>
    <template #body>
      <TabDatos :datosPrincipales="datosPrincipales" />
      <TabConcentrado />
    </template>
  </ContainerTabsLayout>
</template>

<script setup>
import TheSkeleton from "@/components/TheSkeleton.vue";
import { defineAsyncComponent, onBeforeMount, inject, ref } from "@/importsVue";
import { useNominaOperadorStore } from "@/stores/nominaOperadorStore.js";
import { useRoute } from "vue-router";
const route = useRoute();
const useNominaOperador = useNominaOperadorStore();
const { obtenerDetalle, recalcular } = useNominaOperador;
const TabDatos = defineAsyncComponent({
  loader: () => import("./detalle/NominaOperadorDatosPrincipalesTab.vue"),
  loadingComponent: TheSkeleton,
});
const TabConcentrado = defineAsyncComponent(() =>
  import("./detalle/NominaOperadorConcentradoOperadoresTab.vue")
);
const datosPrincipales = ref({});
const breadcrumbs = ref([
  { path: "/nominas/operadores", label: "Nómina Operadores" },
  { label: "Detalle" },
]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const getDetalle = async () => {
  const datos = await obtenerDetalle(route.params.id);
  datosPrincipales.value = datos.datosPrincipales;
};
onBeforeMount(async () => {
  try {
    showLoading(true);
    await getDetalle();
  } catch (error) {
    //
  } finally {
    showLoading(false);
  }
});
const recalcularNomina = async () => {
  try {
    showLoading(true);
    const res = await recalcular({ id: route.params.id });
    if (res.exito) {
      mostrarMensaje("Nómina recalculada correctamente");
    }
    const { datos } = res;
    datosPrincipales.value = datos.datosPrincipales;
  } catch (error) {
    //
  } finally {
    showLoading(false);
  }
};
</script>
