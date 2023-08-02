<template>
  <el-menu
    :default-active="rutaActiva"
    active-text-color="#ffffff"
    :collapse="!props.isMobile"
    :class="[{ 'no-border': isMobile }]"
  >
    <!--<el-sub-menu index="1">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
    <template v-for="(opc, i) in menuOpciones" :key="i">
      <ItemMenu
        :titulo="opc.titulo"
        :index="String(i)"
        :rutaActiva="rutaActiva == String(i)"
        :icono="opc.icono"
        :ruta="opc.ruta"
        :isMobile="props.isMobile"
      />
    </template>
  </el-menu>
</template>

<script setup>
import { ref, defineProps, computed } from "@/importsVue";
// import { UserFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import ItemMenu from "./ItemMenu.vue";
// const userFilledRef = shallowRef(UserFilled);
// const homeFilledRef = shallowRef(HomeFilled);
const router = useRouter();
const menuOpciones = ref([
  { titulo: "Home", icono: "las la-home", ruta: "/" },
  {
    titulo: "Operadores",
    icono: "las la-user",
    ruta: "/operadores",
  },
  {
    titulo: "Gastos Directos",
    icono: "las la-receipt",
    ruta: "/gastos/directos",
  },
  {
    titulo: "Nóminas Operadores",
    icono: "las la-comment-dollar",
    ruta: "/nominas/operadores",
  },
  {
    titulo: "Deducciones",
    icono: "las la-file-invoice",
    ruta: "/deducciones",
  },
]);
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});
const rutaActiva = computed(() => {
  const index = menuOpciones.value.findIndex(
    (opc) => opc.ruta == router.currentRoute.value.path
  );
  return String(index);
});
</script>
