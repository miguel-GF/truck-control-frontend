<template>
  <el-drawer
    v-model="drawer"
    title="Menu"
    direction="rtl"
    :size="isMobile ? '100%' : '33%'"
    :before-close="beforeClose"
  >
    <div class="cursor-pointer">
      <el-row justify="space-between">
        <el-col :span="4">
          <el-icon>
            <UserFilled />
          </el-icon>
        </el-col>
        <el-col :span="20">2</el-col>
      </el-row>
    </div>
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
} from "vue";
import { ElDrawer, ElIcon } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["cerrar"]);

const drawer = ref(false);
const isMobile = ref(false);

// Verificar si la pantalla es móvil en función del ancho de la ventana
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
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
</script>
