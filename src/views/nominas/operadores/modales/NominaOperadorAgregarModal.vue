<template>
  <TheDrawer
    titulo="Agregar Nómina Operador"
    :mostrar="props.mostrar"
    :modelForm="operadorAgregarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar'), limpiarDatos()"
    @aceptar="agregarOperador"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Fecha de Inicio" prop="inicioFecha">
        <el-date-picker
          v-model="operadorAgregarObj.inicioFecha"
          type="date"
          placeholder="YYYY/MM/DD"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="Fecha Fin" prop="finFecha">
        <el-date-picker
          v-model="operadorAgregarObj.finFecha"
          type="date"
          placeholder="YYYY/MM/DD"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </template>
  </TheDrawer>
</template>

<script setup>
import dayjs from "dayjs";
import { reactive, defineProps, defineEmits, inject } from "@/importsVue";
import { useNominaOperadorStore } from "@/stores/nominaOperadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useNominaOperador = useNominaOperadorStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { agregar } = useNominaOperador;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["cerrar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const today = dayjs();
const lunes = today.day(1).format("YYYY-MM-DD");
const sabado = today.day(6).format("YYYY-MM-DD");
const operadorAgregarObj = reactive({
  inicioFecha: lunes,
  finFecha: sabado,
});
const rulesForm = reactive({
  inicioFecha: [
    {
      required: true,
      message: `Fecha inicio es obligatoria`,
      trigger: "blur",
    },
  ],
  finFecha: [
    {
      required: true,
      message: `Fecha fin es obligatoria`,
      trigger: "blur",
    },
  ],
});
const limpiarDatos = () => {
  operadorAgregarObj.inicioFecha = lunes;
  operadorAgregarObj.finFecha = sabado;
};
const agregarOperador = async () => {
  try {
    showLoading(true, "Agregar...");
    changeBtnLoader();
    const res = await agregar(operadorAgregarObj);
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
