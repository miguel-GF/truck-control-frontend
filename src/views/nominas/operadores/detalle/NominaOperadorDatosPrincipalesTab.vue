<template>
  <el-tab-pane label="Datos Principales" name="datos-principales">
    <el-card shadow="hover">
      <el-row>
        <el-col :md="12" :sm="24">
          <TheRowInfo label="Folio">
            <template #value>
              {{ props.datosPrincipales.serie_folio || "--" }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Fecha Inicio" :darkMode="true">
            <template #value>
              {{ props.datosPrincipales.inicio_fecha || "--" }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Fecha Fin">
            <template #value>
              {{ props.datosPrincipales.fin_fecha || "--" }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Status" :darkMode="true">
            <template #value>
              <TheStatus
                :status="props.datosPrincipales.status"
                :statusNombre="props.datosPrincipales.status_nombre"
              />
            </template>
          </TheRowInfo>
        </el-col>
        <el-col :md="12" :sm="24">
          <TheRowInfo label="Fecha Registro">
            <template #value>
              {{ props.datosPrincipales.registro_fecha || "--" }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Total" :darkMode="true">
            <template #value>
              {{ $formatearNumero(props.datosPrincipales.total, "currency") }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Total Gastos">
            <template #value>
              {{
                $formatearNumero(
                  props.datosPrincipales.total_gastos,
                  "currency"
                )
              }}
            </template>
          </TheRowInfo>
          <TheRowInfo label="Total Deducciones" :darkMode="true">
            <template #value>
              {{
                $formatearNumero(
                  props.datosPrincipales.total_deducciones,
                  "currency"
                )
              }}
            </template>
          </TheRowInfo>
        </el-col>
      </el-row>
    </el-card>
  </el-tab-pane>
</template>

<script setup>
import { defineProps } from "@/importsVue";
const props = defineProps({
  datosPrincipales: {
    type: Object,
    default: () => {},
  },
});
</script>
