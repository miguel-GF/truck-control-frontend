<template>
  <TheDrawer
    :titulo="`Editar Gasto Directo - ${gastoObj.serie_folio || '--'}`"
    labelAceptar="Editar"
    :mostrar="props.mostrar"
    :modelForm="gastoDirectoEditarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @aceptar="editarGastoDirecto()"
    @before-open="datosInicial()"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Operador" prop="operadorId">
        <el-select
          v-model="gastoDirectoEditarObj.operadorId"
          placeholder="Selecciona un operador"
          disabled
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
          v-model="gastoDirectoEditarObj.catGastoDirectoId"
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
              v-model.number="gastoDirectoEditarObj.cantidad"
              clearable
              ref="inputCantidad"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Precio Unitario" prop="precio">
            <el-input
              placeholder="Precio unitario"
              v-model="gastoDirectoEditarObj.precio"
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
          v-model="gastoDirectoEditarObj.aplicacionFecha"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Comentario" prop="comentario">
        <el-input
          placeholder="Puede agregar un comentario de referencia"
          v-model="gastoDirectoEditarObj.comentario"
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
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { editar } = useGastoDirecto;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  gastoObj: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["cerrar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const gastoDirectoEditarObj = reactive({
  id: "",
  operadorId: "",
  catGastoDirectoId: "",
  cantidad: "",
  precio: "",
  total: "",
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
const datosInicial = () => {
  gastoDirectoEditarObj.id = props.gastoObj.id;
  gastoDirectoEditarObj.operadorId = props.gastoObj.operador_id;
  gastoDirectoEditarObj.catGastoDirectoId = props.gastoObj.cat_gasto_directo_id;
  gastoDirectoEditarObj.cantidad = props.gastoObj.cantidad;
  gastoDirectoEditarObj.precio = props.gastoObj.precio;
  gastoDirectoEditarObj.aplicacionFecha = props.gastoObj.aplicacion_fecha;
  gastoDirectoEditarObj.comentario = props.gastoObj.comentario;
};
const limpiarDatos = () => {
  gastoDirectoEditarObj.id = "";
  gastoDirectoEditarObj.operadorId = "";
  gastoDirectoEditarObj.catGastoDirectoId = "";
  gastoDirectoEditarObj.cantidad = 1;
  gastoDirectoEditarObj.precio = 0.0;
  gastoDirectoEditarObj.aplicacionFecha = "";
  gastoDirectoEditarObj.comentario = "";
};
const calcularTotal = computed(() => {
  const total = gastoDirectoEditarObj.cantidad * gastoDirectoEditarObj.precio;
  gastoDirectoEditarObj.total = total;
  return total;
});
const editarGastoDirecto = async () => {
  try {
    showLoading(true, "Editando...");
    changeBtnLoader();
    const res = await editar(gastoDirectoEditarObj);
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
