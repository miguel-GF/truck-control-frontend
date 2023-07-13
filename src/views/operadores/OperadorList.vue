<script setup>
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref } from "@/importsVue";

const useOperador = useOperadorStore();
const useApp = useAppStore();
const { filtradosOperadores } = storeToRefs(useOperador);
const { isMobile } = storeToRefs(useApp);
const { listar } = useOperador;
const showLoading = inject("$showLoading");
const columnas = ref([
  {
    id: "clave",
    prop: "clave",
    label: "Clave",
    sortable: true,
    formatter: (row) => row.clave ?? "--",
  },
  {
    id: "nombre",
    prop: "nombre_operador",
    label: "Nombre",
    sortable: true,
    formatter: (row) => row.nombre_operador ?? "--",
  },
  {
    id: "telefono",
    prop: "telefono",
    label: "Teléfono",
    sortable: false,
    formatter: (row) => row.telefono ?? "--",
  },
  {
    id: "opciones",
  },
]);

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
  <el-table
    :data="filtradosOperadores"
    stripe
    table-layout="fixed"
    :class="!isMobile ? 'tabla-gestor' : 'tabla-gestor-mobile'"
  >
    <el-table-column
      v-for="columna in columnas"
      :key="columna.id"
      :prop="columna.prop ?? ''"
      :label="columna.label ?? ''"
      :sortable="columna.sortable ?? false"
      :formatter="columna.formatter ?? (() => {})"
    >
      <!-- <template v-if="columna.id == 'opciones'" #header>
        <el-input
          v-model="busqueda"
          size="small"
          placeholder="Type to search"
        />
      </template> -->
    </el-table-column>
  </el-table>
</template>
