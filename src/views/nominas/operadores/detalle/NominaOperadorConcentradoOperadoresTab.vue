<template>
  <el-tab-pane label="Concentrado Operadores" name="concentrado-operadores">
    <el-card shadow="hover">
      <el-table :data="detalleNomina.detalles" stripe class="full-width">
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
        />
      </el-table>
    </el-card>
  </el-tab-pane>
</template>

<script setup>
import { ref, inject } from "@/importsVue";
import { useNominaOperadorStore } from "@/stores/nominaOperadorStore";
import { storeToRefs } from "pinia";
const useNominaOperador = useNominaOperadorStore();
const { detalleNomina } = storeToRefs(useNominaOperador);
const formatearNumero = inject("$formatearNumero");
const columnas = ref([
  {
    id: "operador",
    prop: "operdor",
    label: "Operdor",
    sortable: true,
    formatter: (row) => row.nombre_operador ?? "--",
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
    id: "totalGastos",
    prop: "total_gastos",
    label: "Total Gastos",
    sortable: true,
    formatter: (row) => formatearNumero(row.total_gastos, "currency"),
    minWidth: "100px",
    align: "right",
  },
  {
    id: "totalDeducciones",
    prop: "total_deducciones",
    label: "Total Deducciones",
    sortable: true,
    formatter: (row) => formatearNumero(row.total_deducciones, "currency"),
    minWidth: "100px",
    align: "right",
  },
]);
</script>
