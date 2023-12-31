<template>
  <TheDrawer
    titulo="Agregar Gasto Directo"
    :mostrar="props.mostrar"
    :modelForm="gastoDirectoAgregarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @after-close="limpiarDatos()"
    @aceptar="agregarGastoDirecto()"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Operador" prop="operadorId">
        <el-select
          v-model="gastoDirectoAgregarObj.operadorId"
          placeholder="Selecciona un operador"
          clearable
          class="fill-width"
        >
          <el-option
            v-for="item in operadores"
            :key="item.id"
            :label="item.nombre_operador"
            :value="item.id"
          >
            <span
              style="
                float: left;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >[{{ item.clave }}]</span
            >
            <span style="float: right">{{ item.nombre_operador }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tipo de Gasto" prop="catGastoDirectoId">
        <el-select
          v-model="gastoDirectoAgregarObj.catGastoDirectoId"
          placeholder="Selecciona un tipo"
          disabled
          clearable
          class="fill-width"
        >
          <el-option
            v-for="item in catalogo"
            :key="item.id"
            :label="item.nombre"
            :value="item.id"
          >
            <span
              style="
                float: left;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >[{{ item.clave }}]</span
            >
            <span style="float: right">{{ item.nombre }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Cantidad" prop="cantidad">
            <el-input
              placeholder="Cantidad"
              v-model.number="gastoDirectoAgregarObj.cantidad"
              clearable
              ref="inputCantidad"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Precio Unitario" prop="precio">
            <el-input
              placeholder="Precio unitario"
              v-model="gastoDirectoAgregarObj.precio"
              :formatter="
                (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Total" prop="total">
        <el-input
          placeholder="Total"
          v-model="calcularTotal"
          :formatter="
            (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
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
      <el-form-item label="Comentario" prop="comentario">
        <el-input
          placeholder="Puede agregar un comentario de referencia"
          v-model="gastoDirectoAgregarObj.comentario"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
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
import { storeToRefs } from "pinia";
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useGastoDirectoStore } from "@/stores/gastoDirectoStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useOperador = useOperadorStore();
const useGastoDirecto = useGastoDirectoStore();
const { operadores } = storeToRefs(useOperador);
const { catalogo } = storeToRefs(useGastoDirecto);
const { agregar } = useGastoDirecto;
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
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
  catGastoDirectoId: 1,
  cantidad: 1,
  precio: 0.0,
  total: 0.0,
  aplicacionFecha: "",
  comentario: "",
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
      message: `Fecha de aplicación es obligatoria`,
      trigger: "blur",
    },
  ],
});
const limpiarDatos = () => {
  gastoDirectoAgregarObj.operadorId = "";
  gastoDirectoAgregarObj.catGastoDirectoId = 1;
  gastoDirectoAgregarObj.cantidad = 1;
  gastoDirectoAgregarObj.precio = 0.0;
  gastoDirectoAgregarObj.total = 0.0;
  gastoDirectoAgregarObj.aplicacionFecha = "";
  gastoDirectoAgregarObj.comentario = "";
};
const calcularTotal = computed(() => {
  const total = gastoDirectoAgregarObj.cantidad * gastoDirectoAgregarObj.precio;
  gastoDirectoAgregarObj.total = total;
  return total;
});
const agregarGastoDirecto = async () => {
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
