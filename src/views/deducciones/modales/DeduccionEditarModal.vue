<template>
  <TheDrawer
    :titulo="`Editar Deducción - ${deduccionObj.serie_folio || '--'}`"
    labelAceptar="Editar"
    :mostrar="props.mostrar"
    :modelForm="deduccionEditarObj"
    :rulesForm="rulesForm"
    @cerrar="emit('cerrar')"
    @aceptar="editarDeduccion()"
    @before-open="datosInicial()"
    class="custom-title"
  >
    <template #body>
      <el-form-item label="Operador" prop="operadorId">
        <el-select
          v-model="deduccionEditarObj.operadorId"
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
      <el-form-item label="Tipo de Deducción" prop="catDeduccionId">
        <el-select
          v-model="deduccionEditarObj.catDeduccionId"
          placeholder="Selecciona un tipo"
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
              v-model.number="deduccionEditarObj.cantidad"
              clearable
              ref="inputCantidad"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Precio Unitario" prop="precio">
            <el-input
              placeholder="Precio unitario"
              v-model="deduccionEditarObj.precio"
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
          v-model="deduccionEditarObj.aplicacionFecha"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Comentario" prop="comentario">
        <el-input
          placeholder="Puede agregar un comentario de referencia"
          v-model="deduccionEditarObj.comentario"
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
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { editar } = useDeduccion;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  deduccionObj: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["cerrar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const deduccionEditarObj = reactive({
  id: "",
  operadorId: "",
  catDeduccionId: "",
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
const datosInicial = () => {
  deduccionEditarObj.id = props.deduccionObj.id;
  deduccionEditarObj.operadorId = props.deduccionObj.operador_id;
  deduccionEditarObj.catDeduccionId = props.deduccionObj.cat_deduccion_id;
  deduccionEditarObj.cantidad = props.deduccionObj.cantidad;
  deduccionEditarObj.precio = props.deduccionObj.precio;
  deduccionEditarObj.aplicacionFecha = props.deduccionObj.aplicacion_fecha;
  deduccionEditarObj.comentario = props.deduccionObj.comentario;
};
const limpiarDatos = () => {
  deduccionEditarObj.id = "";
  deduccionEditarObj.operadorId = "";
  deduccionEditarObj.catDeduccionId = "";
  deduccionEditarObj.cantidad = 1;
  deduccionEditarObj.precio = 0.0;
  deduccionEditarObj.aplicacionFecha = "";
  deduccionEditarObj.comentario = "";
};
const calcularTotal = computed(() => {
  const total = deduccionEditarObj.cantidad * deduccionEditarObj.precio;
  deduccionEditarObj.total = total;
  return total;
});
const editarDeduccion = async () => {
  try {
    showLoading(true, "Editando...");
    changeBtnLoader();
    const res = await editar(deduccionEditarObj);
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
