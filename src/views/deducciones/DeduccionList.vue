<script setup>
import { useDeduccionStore } from "@/stores/deduccionStore.js";
import { useAppStore } from "@/stores/appStore.js";
import { useOperadorStore } from "@/stores/operadorStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref, defineAsyncComponent } from "@/importsVue";
const EditarModal = defineAsyncComponent(() =>
  import("./modales/DeduccionEditarModal.vue")
);
const EliminarModal = defineAsyncComponent(() =>
  import("./modales/DeduccionEliminarModal.vue")
);
const useDeduccion = useDeduccionStore();
const useApp = useAppStore();
const useOperador = useOperadorStore();
const { filtradosDeducciones } = storeToRefs(useDeduccion);
const { isMobile } = storeToRefs(useApp);
const { listar, listarCatalogo } = useDeduccion;
const listarOperador = useOperador.listar;
const mostrarEditar = ref(false);
const mostrarEliminar = ref(false);
const deduccionObj = ref({});
const showLoading = inject("$showLoading");
const formatearNumero = inject("$formatearNumero");
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
    prop: "nombre_deduccion",
    label: "Nombre",
    sortable: true,
    formatter: (row) => row.nombre_deduccion ?? "--",
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
    id: "nomina",
    prop: "nomina_folio",
    label: "Nomina",
    sortable: true,
    formatter: (row) => row.nomina_folio ?? "--",
    minWidth: "100px",
  },
  {
    id: "cantidad",
    prop: "cantidad",
    label: "Cantidad",
    sortable: true,
    formatter: (row) => formatearNumero(row.cantidad),
    minWidth: "100px",
    align: "center",
  },
  {
    id: "precio",
    prop: "precio",
    label: "Precio",
    sortable: true,
    formatter: (row) => formatearNumero(row.precio, "currency"),
    minWidth: "100px",
    align: "right",
  },
  {
    id: "total",
    prop: "total",
    label: "Total",
    sortable: true,
    formatter: (row) => formatearNumero(row.total, "currency"),
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
    listarOperador();
    listarCatalogo();
    await listar();
  } catch (error) {
    //
  } finally {
    showLoading(false);
  }
});
const abrirEditar = (row) => {
  deduccionObj.value = row;
  mostrarEditar.value = true;
};
const cerrarEditar = () => (mostrarEditar.value = false);
const abrirEliminar = (row) => {
  deduccionObj.value = row;
  mostrarEliminar.value = true;
};
const cerrarEliminar = () => (mostrarEliminar.value = false);
</script>

<template>
  <el-table
    :data="filtradosDeducciones"
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
        <el-row
          justify="space-around"
          v-if="Number(scope.row.status) == 200 || !scope.row.nomina_id"
        >
          <div>
            <el-tooltip content="Editar" placement="left-start">
              <el-icon
                class="cursor-pointer"
                @click="abrirEditar(scope.row)"
                size="16"
                ><i class="las la-edit"></i
              ></el-icon>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip content="Eliminar" placement="left-start">
              <el-icon
                color="primary"
                class="cursor-pointer primary"
                @click="abrirEliminar(scope.row)"
                size="16"
                ><i class="las la-trash-alt"></i
              ></el-icon>
            </el-tooltip>
          </div>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <EditarModal
    :mostrar="mostrarEditar"
    :deduccionObj="deduccionObj"
    @cerrar="cerrarEditar()"
  />
  <EliminarModal
    :mostrar="mostrarEliminar"
    :deduccionObj="deduccionObj"
    @cerrar="cerrarEliminar()"
  />
</template>
