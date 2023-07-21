<script setup>
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount, inject, ref, defineAsyncComponent } from "@/importsVue";
const EditarModal = defineAsyncComponent(() =>
  import("./modales/OperadorEditarModal.vue")
);
const EliminarModal = defineAsyncComponent(() =>
  import("./modales/OperadorEliminarModal.vue")
);
const useOperador = useOperadorStore();
const useApp = useAppStore();
const { filtradosOperadores } = storeToRefs(useOperador);
const { isMobile } = storeToRefs(useApp);
const { listar } = useOperador;
const mostrarEditar = ref(false);
const mostrarEliminar = ref(false);
const operadorObj = ref({});
const showLoading = inject("$showLoading");
const columnas = ref([
  {
    id: "clave",
    prop: "clave",
    label: "Clave",
    sortable: true,
    formatter: (row) => row.clave ?? "--",
    minWidth: "100px",
  },
  {
    id: "nombre",
    prop: "nombre_operador",
    label: "Nombre",
    sortable: true,
    formatter: (row) => row.nombre_operador ?? "--",
    minWidth: "400px",
  },
  {
    id: "telefono",
    prop: "telefono",
    label: "Teléfono",
    sortable: false,
    formatter: (row) => row.telefono ?? "--",
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
  operadorObj.value = row;
  mostrarEditar.value = true;
};
const cerrarEditar = () => (mostrarEditar.value = false);
const abrirEliminar = (row) => {
  operadorObj.value = row;
  mostrarEliminar.value = true;
};
const cerrarEliminar = () => (mostrarEliminar.value = false);
</script>

<template>
  <el-table
    :data="filtradosOperadores"
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
    >
      <!-- <template v-if="columna.id == 'opciones'" #header>
        <el-input
          v-model="busqueda"
          size="small"
          placeholder="Type to search"
        />
      </template> -->
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
    :operadorObj="operadorObj"
    @cerrar="cerrarEditar()"
  />
  <EliminarModal
    :mostrar="mostrarEliminar"
    :operadorObj="operadorObj"
    @cerrar="cerrarEliminar()"
  />
</template>
