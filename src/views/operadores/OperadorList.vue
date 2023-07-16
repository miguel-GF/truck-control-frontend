<script setup>
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref, defineAsyncComponent } from "@/importsVue";
const EditarModal = defineAsyncComponent(() =>
  import("./modales/OperadorEditarModal.vue")
);
const useOperador = useOperadorStore();
const useApp = useAppStore();
const { filtradosOperadores } = storeToRefs(useOperador);
const { isMobile } = storeToRefs(useApp);
const { listar } = useOperador;
const mostrarEditar = ref(false);
const operadorObj = ref({});
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
const abrirEditar = (row) => {
  operadorObj.value = row;
  mostrarEditar.value = true;
};
const cerrarEditar = () => (mostrarEditar.value = false);
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
      <template v-if="columna.id == 'opciones'" #default="scope">
        <div>
          <el-tooltip content="Editar" placement="left-start">
            <el-icon class="cursor-pointer" @click="abrirEditar(scope.row)"
              ><Edit
            /></el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <EditarModal
    :mostrar="mostrarEditar"
    :operadorObj="operadorObj"
    @cerrar="cerrarEditar()"
  />
</template>
