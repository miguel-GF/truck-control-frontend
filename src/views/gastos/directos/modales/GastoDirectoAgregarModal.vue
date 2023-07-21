<template>
  <TheDrawer
    titulo="Agregar Gasto Directo"
    :mostrar="props.mostrar"
    :modelForm="gastoDirectoAgregarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @after-close="limpiarDatos()"
    @aceptar="agregarOperador"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Cantidad" prop="cantidad">
        <el-input
          placeholder="Cantidad"
          v-model="gastoDirectoAgregarObj.cantidad"
          clearable
          ref="inputCantidad"
        />
      </el-form-item>
      <el-form-item label="Precio Unitario" prop="precio">
        <el-input
          placeholder="Precio unitario"
          v-model="gastoDirectoAgregarObj.precio"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Total" prop="total">
        <el-input
          placeholder="Total"
          v-model="calcularTotal"
          disabled
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Fecha de Aplicación" prop="aplicacionFecha">
        <el-input
          placeholder="YYYY-MM-DD"
          v-model="gastoDirectoAgregarObj.aplicacionFecha"
          clearable
        ></el-input>
      </el-form-item>
    </template>
  </TheDrawer>
</template>

<script setup>
import {
  reactive,
  defineProps,
  defineEmits,
  inject,
  computed,
} from "@/importsVue";
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
const gastoDirectoAgregarObj = reactive({
  operadorId: "",
  catGastoDirectoId: "",
  cantidad: 1,
  precio: 0.0,
  total: 0.0,
  aplicacionFecha: "",
});
const rulesForm = reactive({
  operadorId: [
    {
      required: true,
      message: `Operador es obligatorio`,
      trigger: "blur",
    },
  ],
  catGastoDirectoId: [
    {
      required: true,
      message: `Tipo gasto directo es obligatorio`,
      trigger: "blur",
    },
  ],
  cantidad: [
    {
      required: true,
      message: `Cantidad es obligatorio`,
      trigger: "blur",
    },
  ],
  precio: [
    {
      required: true,
      message: `Precio es obligatorio`,
      trigger: "blur",
    },
  ],
  total: [
    {
      required: true,
      message: `Total es obligatorio`,
      trigger: "blur",
    },
  ],
  aplicacionFecha: [
    {
      required: true,
      message: `Fecha de Aplicación es obligatoria`,
      trigger: "blur",
    },
  ],
});
const limpiarDatos = () => {
  gastoDirectoAgregarObj.operadorId = "";
  gastoDirectoAgregarObj.catGastoDirectoId = "";
  gastoDirectoAgregarObj.cantidad = 1;
  gastoDirectoAgregarObj.precio = 0.0;
  gastoDirectoAgregarObj.total = 0.0;
  gastoDirectoAgregarObj.aplicacionFecha = "";
};
const calcularTotal = computed(() => {
  const total = gastoDirectoAgregarObj.cantidad * gastoDirectoAgregarObj.precio;
  gastoDirectoAgregarObj.total = total;
  return total;
});
const agregarOperador = async () => {
  try {
    showLoading(true, "Agregando...");
    changeBtnLoader();
    const res = await agregar(gastoDirectoAgregarObj);
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
