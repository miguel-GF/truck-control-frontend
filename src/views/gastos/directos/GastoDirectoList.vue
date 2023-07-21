<script setup>
import { useGastoDirectoStore } from "@/stores/gastoDirectoStore.js";
import { useAppStore } from "@/stores/appStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref, defineAsyncComponent } from "@/importsVue";
const EditarModal = defineAsyncComponent(() =>
  import("./modales/GastoDirectoEditarModal.vue")
);
const EliminarModal = defineAsyncComponent(() =>
  import("./modales/GastoDirectoEliminarModal.vue")
);
const useGasto = useGastoDirectoStore();
const useApp = useAppStore();
const { filtradosGastosDirectos } = storeToRefs(useGasto);
const { isMobile } = storeToRefs(useApp);
const { listar } = useGasto;
const mostrarEditar = ref(false);
const mostrarEliminar = ref(false);
const gastoObj = ref({});
const showLoading = inject("$showLoading");
const columnas = ref([
  {
    id: "folio",
    prop: "folio",
    label: "Folio",
    sortable: true,
    formatter: (row) => row.serie_folio ?? "--",
    minWidth: "100px",
    align: "center",
  },
  {
    id: "nombre",
    prop: "nombre_gasto_directo",
    label: "Nombre",
    sortable: true,
    formatter: (row) => row.nombre_gasto_directo ?? "--",
    minWidth: "120px",
  },
  {
    id: "operador",
    prop: "nombre_operador",
    label: "Operador",
    sortable: true,
    formatter: (row) => row.nombre_operador ?? "--",
    minWidth: "200px",
  },
  {
    id: "cantidad",
    prop: "cantidad",
    label: "Cantidad",
    sortable: true,
    formatter: (row) => row.cantidad ?? "--",
    minWidth: "100px",
    align: "center",
  },
  {
    id: "precio",
    prop: "precio",
    label: "Precio",
    sortable: true,
    formatter: (row) => row.precio ?? "--",
    minWidth: "100px",
    align: "right",
  },
  {
    id: "total",
    prop: "total",
    label: "Total",
    sortable: true,
    formatter: (row) => row.total ?? "--",
    minWidth: "100px",
    align: "right",
  },
  {
    id: "fechaAplicacion",
    prop: "aplicacion_fecha",
    label: "Aplicación Fecha",
    sortable: false,
    formatter: (row) => row.aplicacion_fecha ?? "--",
    minWidth: "120px",
  },
  {
    id: "status",
    prop: "status_nombre",
    label: "Status",
    sortable: false,
    minWidth: "100px",
  },
  {
    id: "opciones",
    fixed: "right",
    minWidth: "50px",
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
  gastoObj.value = row;
  mostrarEditar.value = true;
};
const cerrarEditar = () => (mostrarEditar.value = false);
const abrirEliminar = (row) => {
  gastoObj.value = row;
  mostrarEliminar.value = true;
};
const cerrarEliminar = () => (mostrarEliminar.value = false);
</script>

<template>
  <el-table
    :data="filtradosGastosDirectos"
    stripe
    :class="!isMobile ? 'tabla-gestor' : 'tabla-gestor-mobile'"
  >
    <el-table-column
      v-for="columna in columnas"
      :key="columna.id"
      :prop="columna.prop ?? ''"
      :label="columna.label ?? ''"
      :sortable="columna.sortable ?? false"
      :formatter="columna.formatter ?? (() => {})"
      :fixed="columna.fixed ?? false"
      :min-width="columna.minWidth ?? null"
      :align="columna.align ?? 'left'"
    >
      <template v-if="columna.id == 'status'" #default="scope">
        <TheStatus
          :status="scope.row.status"
          :statusNombre="scope.row.status_nombre"
        />
      </template>
      <template v-else-if="columna.id == 'opciones'" #default="scope">
        <el-row justify="space-around" v-if="Number(scope.row.status) == 200">
          <div>
            <el-tooltip content="Editar" placement="left-start">
              <el-icon class="cursor-pointer" @click="abrirEditar(scope.row)"
                ><Edit
              /></el-icon>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip content="Eliminar" placement="left-start">
              <el-icon
                color="primary"
                class="cursor-pointer primary"
                @click="abrirEliminar(scope.row)"
                ><Delete
              /></el-icon>
            </el-tooltip>
          </div>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <EditarModal
    :mostrar="mostrarEditar"
    :gastoObj="gastoObj"
    @cerrar="cerrarEditar()"
  />
  <EliminarModal
    :mostrar="mostrarEliminar"
    :gastoObj="gastoObj"
    @cerrar="cerrarEliminar()"
  />
</template>