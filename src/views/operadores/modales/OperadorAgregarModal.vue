<template>
  <TheDrawer
    titulo="Agregar operador"
    :mostrar="props.mostrar"
    :modelForm="operadorAgregarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @aceptar="agregarOperador"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Nombre/s" prop="nombre">
        <el-input
          placeholder="Nombre o nombres del operador"
          v-model="operadorAgregarObj.nombre"
          clearable
          ref="inputNombre"
        />
      </el-form-item>
      <el-form-item label="Apellidos" prop="apellidos">
        <el-input
          placeholder="Apellidos del operador"
          v-model="operadorAgregarObj.apellidos"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Teléfono" prop="telefono">
        <el-input
          placeholder="10 dígitos"
          v-model="operadorAgregarObj.telefono"
          v-mask="'(###) ###-##-##'"
          clearable
          @input="
            $validarInputNoObligatorio(
              rulesForm,
              operadorAgregarObj,
              'telefono'
            )
          "
        ></el-input>
      </el-form-item>
    </template>
  </TheDrawer>
</template>

<script setup>
import { reactive, defineProps, defineEmits, inject } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useOperador = useOperadorStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { agregar } = useOperador;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["cerrar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const operadorAgregarObj = reactive({
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
const limpiarDatos = () => {
  operadorAgregarObj.nombre = "";
  operadorAgregarObj.apellidos = "";
  operadorAgregarObj.telefono = "";
};
const agregarOperador = async () => {
  try {
    showLoading(true, "Agregar...");
    const res = await agregar(operadorAgregarObj);
    if (res.exito) {
      mostrarMensaje(res.mensaje);
      changeBtnLoader();
      emit("cerrar");
      limpiarDatos();
    }
  } catch (error) {
    changeBtnLoader();
  } finally {
    showLoading(false);
  }
};
</script>
