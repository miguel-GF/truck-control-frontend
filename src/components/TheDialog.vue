<template>
  <el-dialog
    v-model="showDialog"
    width="30%"
    :close-on-click-modal="false"
    :title="props.titulo"
    @open="beforeOpen()"
    @closed="afterClosed()"
  >
    <el-alert
      :closable="false"
      :type="tipoAlerta"
      :title="tituloAlerta"
      show-icon
    >
      <div class="ep-font-size-medium">
        <slot name="default"> Descripción del modal / alerta </slot>
      </div>
    </el-alert>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cerrar()">Cerrar</el-button>
        <el-button type="primary" @click="confirmar()"> Confirmar </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "@/importsVue";
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  titulo: {
    type: String,
    default: "Titulo",
  },
  tipo: {
    type: String,
    default: "info",
  },
  tituloAlerta: {
    type: String,
    default: "Esta operación no se puede deshacer.",
  },
});
const showDialog = ref(props.mostrar);
const tipoAlerta = ref("");
const emit = defineEmits(["cerrar", "confirmar"]);
const beforeOpen = () => {};
const afterClosed = () => cerrar();
const cerrar = () => {
  showDialog.value = false;
  emit("cerrar");
};
const confirmar = () => {
  emit("confirmar");
};
watch(
  () => props.mostrar,
  (newValue) => {
    showDialog.value = newValue;
  }
);
watch(
  () => props.mostrar,
  () => {
    switch (props.tipo) {
      case "exito":
      case "success":
        tipoAlerta.value = "success";
        break;
      case "advertencia":
      case "warning":
        tipoAlerta.value = "warning";
        break;
      case "error":
        tipoAlerta.value = "error";
        break;
      default:
        tipoAlerta.value = "info";
    }
  }
);
</script>
