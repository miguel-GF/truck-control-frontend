<template>
  <TheDrawer
    titulo="Agregar Deducción"
    :mostrar="props.mostrar"
    :modelForm="deduccionAgregarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @after-close="limpiarDatos()"
    @aceptar="agregarGastoDirecto()"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Operador" prop="operadorId">
        <el-select
          v-model="deduccionAgregarObj.operadorId"
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
      <el-form-item label="Tipo de Gasto" prop="catDeduccionId">
        <el-select
          v-model="deduccionAgregarObj.catDeduccionId"
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
              v-model.number="deduccionAgregarObj.cantidad"
              clearable
              ref="inputCantidad"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Precio Unitario" prop="precio">
            <el-input
              placeholder="Precio unitario"
              v-model="deduccionAgregarObj.precio"
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
          v-model="deduccionAgregarObj.aplicacionFecha"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Comentario" prop="comentario">
        <el-input
          placeholder="Puede agregar un comentario de referencia"
          v-model="deduccionAgregarObj.comentario"
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
import { useDeduccionStore } from "@/stores/deduccionStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useOperador = useOperadorStore();
const useDeduccion = useDeduccionStore();
const { operadores } = storeToRefs(useOperador);
const { catalogo } = storeToRefs(useDeduccion);
const { agregar } = useDeduccion;
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
const deduccionAgregarObj = reactive({
  operadorId: "",
  catDeduccionId: 1,
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
  catDeduccionId: [
    {
      required: true,
      message: `Tipo deducción es obligatorio`,
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
  deduccionAgregarObj.operadorId = "";
  deduccionAgregarObj.catDeduccionId = 1;
  deduccionAgregarObj.cantidad = 1;
  deduccionAgregarObj.precio = 0.0;
  deduccionAgregarObj.total = 0.0;
  deduccionAgregarObj.aplicacionFecha = "";
  deduccionAgregarObj.comentario = "";
};
const calcularTotal = computed(() => {
  const total = deduccionAgregarObj.cantidad * deduccionAgregarObj.precio;
  deduccionAgregarObj.total = total;
  return total;
});
const agregarGastoDirecto = async () => {
  try {
    showLoading(true, "Agregando...");
    changeBtnLoader();
    const res = await agregar(deduccionAgregarObj);
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
