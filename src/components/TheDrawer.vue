<template>
  <el-drawer
    v-model="drawer"
    :title="titulo"
    direction="rtl"
    :size="isMobile ? '100%' : '33%'"
    :before-close="beforeClose"
  >
    <div class="p-2">
      <slot name="body">Es el cuerpo</slot>
    </div>
    <template #footer v-if="mostrarFooter">
      <div>
        <el-button @click="emit('cerrar')">Cerrar</el-button>
        <el-button type="primary" @click="aceptarClick">Aceptar</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  defineProps,
  defineEmits,
} from "@/importsVue";
import { ElDrawer } from "element-plus";

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  titulo: {
    type: String,
    default: "",
  },
  mostrarFooter: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["cerrar", "aceptar"]);

const drawer = ref(false);
const isMobile = ref(false);

// Verificar si la pantalla es móvil en función del ancho de la ventana
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 767;
};

watch(
  () => props.mostrar,
  (value) => {
    drawer.value = value;
  }
);

const beforeClose = (done) => {
  done();
  emit("cerrar");
};
// Escuchar cambios en el tamaño de la ventana para actualizar isMobile
onMounted(() => {
  window.addEventListener("resize", checkMobile);
  drawer.value = props.mostrar;
  checkMobile();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
  drawer.value = false;
});

const aceptarClick = () => emit("aceptar");
</script>
