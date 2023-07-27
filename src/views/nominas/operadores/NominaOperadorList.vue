<script setup>
import { useNominaOperadorStore } from "@/stores/nominaOperadorStore";
import { useAppStore } from "@/stores/appStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref, defineAsyncComponent } from "@/importsVue";
const EliminarModal = defineAsyncComponent(() =>
  import("./modales/NominaOperadorEliminarModal.vue")
);
const useOperador = useNominaOperadorStore();
const useApp = useAppStore();
const { filtradosNominasOperadores } = storeToRefs(useOperador);
const { isMobile } = storeToRefs(useApp);
const { listar } = useOperador;
const mostrarEliminar = ref(false);
const operadorObj = ref({});
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
    id: "total",
    prop: "total",
    label: "Total",
    sortable: true,
    formatter: (row) => formatearNumero(row.total, "currency"),
    minWidth: "100px",
    align: "right",
  },
  {
    id: "totalGastos",
    prop: "total_gastos",
    label: "Total Gastos",
    sortable: true,
    formatter: (row) => formatearNumero(row.total_gastos, "currency"),
    minWidth: "100px",
    align: "right",
  },
  {
    id: "totalGastos",
    prop: "total_deducciones",
    label: "Total Deducciones",
    sortable: true,
    formatter: (row) => formatearNumero(row.total_deducciones, "currency"),
    minWidth: "100px",
    align: "right",
  },
  {
    id: "inicioFecha",
    prop: "inicioFecha",
    label: "Fecha Inicio",
    sortable: true,
    formatter: (row) => row.inicio_fecha ?? "--",
    minWidth: "120px",
    align: "center",
  },
  {
    id: "finFecha",
    prop: "finFecha",
    label: "Fecha Fin",
    sortable: true,
    formatter: (row) => row.fin_fecha ?? "--",
    minWidth: "120px",
    align: "center",
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
const abrirEliminar = (row) => {
  operadorObj.value = row;
  mostrarEliminar.value = true;
};
const cerrarEliminar = () => (mostrarEliminar.value = false);
</script>

<template>
  <el-table
    :data="filtradosNominasOperadores"
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
  <EliminarModal
    :mostrar="mostrarEliminar"
    :operadorObj="operadorObj"
    @cerrar="cerrarEliminar()"
  />
</template>
