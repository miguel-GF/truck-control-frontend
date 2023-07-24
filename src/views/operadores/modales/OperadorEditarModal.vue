<template>
  <TheDrawer
    :titulo="`Editar Operador - ${operadorObj.clave || '--'}`"
    labelAceptar="Editar"
    :mostrar="props.mostrar"
    :modelForm="operadorEditarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @aceptar="editarOperador"
    @before-open="datosInicial()"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Nombre/s" prop="nombre">
        <el-input
          placeholder="Nombre o nombres del operador"
          v-model="operadorEditarObj.nombre"
          clearable
        />
      </el-form-item>
      <el-form-item label="Apellidos" prop="apellidos">
        <el-input
          placeholder="Apellidos del operador"
          v-model="operadorEditarObj.apellidos"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Teléfono" prop="telefono">
        <el-input
          placeholder="10 dígitos"
          v-model="operadorEditarObj.telefono"
          v-mask="'(###) ###-##-##'"
          clearable
          @input="
            $validarInputNoObligatorio(rulesForm, operadorEditarObj, 'telefono')
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
const { editar } = useOperador;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  operadorObj: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["cerrar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const operadorEditarObj = reactive({
  id: "",
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
const datosInicial = () => {
  operadorEditarObj.id = props.operadorObj.id;
  operadorEditarObj.nombre = props.operadorObj.nombre;
  operadorEditarObj.apellidos = props.operadorObj.apellidos;
  operadorEditarObj.telefono = props.operadorObj.telefono;
};
const limpiarDatos = () => {
  operadorEditarObj.id = "";
  operadorEditarObj.nombre = "";
  operadorEditarObj.apellidos = "";
  operadorEditarObj.telefono = "";
};
const editarOperador = async () => {
  try {
    showLoading(true, "Editando...");
    changeBtnLoader();
    const res = await editar(operadorEditarObj);
    if (res.exito) {
      mostrarMensaje(res.mensaje);
      changeBtnLoader(false);
      emit("cerrar");
      limpiarDatos();
    }
  } catch (error) {
    changeBtnLoader(false);
  } finally {
    showLoading(false);
  }
};
</script>
