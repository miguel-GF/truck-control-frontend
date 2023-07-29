<template>
  <el-card class="header-view">
    <el-row>
      <el-col :span="24">
        <el-row align="middle">
          <el-col :span="16">
            <el-row class="title"> {{ props.titulo }} </el-row>
            <el-row>
              <el-col :span="8">
                <template v-if="props.tipoVisualizacion == 'busqueda'">
                  <el-input
                    v-model="busqueda"
                    @input="buscar()"
                    size="small"
                    :placeholder="props.placeholder"
                    clearable
                  />
                </template>
                <template v-else-if="props.tipoVisualizacion == 'breadcrumbs'">
                  <el-breadcrumb separator="/">
                    <template
                      v-for="(bc, index) in breadcrumbsHeader"
                      :key="index"
                    >
                      <el-breadcrumb-item :to="{ path: bc.path ?? '' }">{{
                        bc.label
                      }}</el-breadcrumb-item>
                    </template>
                  </el-breadcrumb>
                </template>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-col>
          <el-col :span="8" align="end">
            <slot name="acciones">
              <el-button @click="agregar()" type="primary">Agregar</el-button>
            </slot>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "@/importsVue";
const busqueda = ref("");
const props = defineProps({
  titulo: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Buscar",
  },
  tipoVisualizacion: {
    type: String,
    default: "busqueda",
  },
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
const breadcrumbsHeader = [...props.breadcrumbs];
const homeBreadcrumb = { path: "/", label: "Home" };
breadcrumbsHeader.unshift(homeBreadcrumb);
const emit = defineEmits(["buscar", "agregar"]);
const buscar = () => emit("buscar", busqueda);
const agregar = () => emit("agregar");
</script>
