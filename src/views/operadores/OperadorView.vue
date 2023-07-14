<template>
  <TheHeader
    placeholder="Buscar por Clave / Nombre"
    @buscar="filtrar"
    @agregar="abrirAgregar()"
  />
  <el-row>
    <el-col :span="24">
      <OperadorList />
    </el-col>
  </el-row>
  <TheDrawer
    titulo="Agregar operador"
    :mostrar="mostrarAgregar"
    :modelForm="operadorAltaObj"
    :rulesForm="rulesForm"
    @cerrar="mostrarAgregar = false"
    @aceptar="agregarOperador"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Nombre/s" prop="nombre">
        <el-input
          placeholder="Nombre o nombres del operador"
          v-model="operadorAltaObj.nombre"
          clearable
        />
      </el-form-item>
      <el-form-item label="Apellidos" prop="apellidos">
        <el-input
          placeholder="Apellidos del operador"
          v-model="operadorAltaObj.apellidos"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Teléfono" prop="telefono">
        <el-input
          placeholder="10 dígitos"
          v-model="operadorAltaObj.telefono"
          v-mask="'(###) ###-##-##'"
          clearable
          @input="updateValidationTrigger('telefono')"
        ></el-input>
      </el-form-item>
    </template>
  </TheDrawer>
</template>

<script setup>
import OperadorList from "./OperadorList.vue";
import { ref, reactive } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
const mostrarAgregar = ref(false);
const useOperadores = useOperadorStore();
const { filtrarListar } = useOperadores;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
const agregarOperador = () => console.log("Agregar operador");
const operadorAltaObj = reactive({
  nombre: "",
  apellidos: "",
  telefono: "",
});
const rulesForm = reactive({
  nombre: [
    {
      required: true,
      message: `Nombre es obligatorio`,
      trigger: "blur",
    },
  ],
  apellidos: [
    {
      required: true,
      message: `Apellidos es obligatorio`,
      trigger: "blur",
    },
  ],
  telefono: [
    {
      required: false,
      min: 15,
      max: 15,
      message: "Deben ser 10 dígitos",
      trigger: "blur",
    },
  ],
});
const updateValidationTrigger = (field) => {
  if (operadorAltaObj[field]) {
    rulesForm[field][0].trigger = "change";
  } else {
    rulesForm[field][0].trigger = "blur";
  }
};
</script>
