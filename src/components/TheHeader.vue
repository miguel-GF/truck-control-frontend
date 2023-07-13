<template>
  <el-col :span="24">
    <el-row class="title"> Operadores </el-row>
    <el-row>
      <el-col :span="8">
        <el-input
          v-model="busqueda"
          @input="buscar()"
          size="small"
          :placeholder="props.placeholder"
        />
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <div class="flex items-center" align="end">
          <el-button @click="agregar()" type="primary">Agregar</el-button>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "@/importsVue";
const busqueda = ref("");
const props = defineProps({
  placeholder: {
    type: String,
    default: "Buscar",
  },
});
const emit = defineEmits(["buscar", "agregar"]);
const buscar = () => emit("buscar", busqueda);
const agregar = () => emit("agregar");
</script>
