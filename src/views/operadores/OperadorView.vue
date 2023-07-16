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
          @input="
            $validarInputNoObligatorio(rulesForm, operadorAltaObj, 'telefono')
          "
        ></el-input>
      </el-form-item>
    </template>
  </TheDrawer>
</template>

<script setup>
import OperadorList from "./OperadorList.vue";
import { ref, reactive, inject } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const mostrarAgregar = ref(false);
const useOperador = useOperadorStore();
const useApp = useAppStore();
const { filtrarListar, agregar } = useOperador;
const { changeBtnLoader } = useApp;
const filtrar = async (busqueda) => {
  await filtrarListar(busqueda);
};
const abrirAgregar = () => (mostrarAgregar.value = true);
const agregarOperador = async () => {
  try {
    showLoading(true, "Agregando...");
    const res = await agregar(operadorAltaObj);
    if (res.exito) {
      mostrarMensaje(res.mensaje);
      mostrarAgregar.value = false;
      limpiarDatosAgregar();
      changeBtnLoader();
    }
  } catch (error) {
    //
  } finally {
    showLoading(false);
  }
};
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
const limpiarDatosAgregar = () => {
  operadorAltaObj.nombre = "";
  operadorAltaObj.apellidos = "";
  operadorAltaObj.telefono = "";
};
</script>
