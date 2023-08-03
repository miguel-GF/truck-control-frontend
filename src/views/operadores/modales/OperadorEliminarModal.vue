<template>
  <TheDialog
    :mostrar="mostrar"
    titulo="Eliminar Operador"
    tipo="error"
    @cerrar="cerrar()"
    @confirmar="eliminarOperador()"
  >
    <template #default>
      <div>
        Eliminará al operador
        {{ `${operadorObj.clave} - ${operadorObj.nombre_operador}` }}
      </div>
    </template>
  </TheDialog>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "@/importsVue";
import { useOperadorStore } from "@/stores/operadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useOperador = useOperadorStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { eliminar } = useOperador;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  operadorObj: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["cerrar", "confirmar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const cerrar = () => emit("cerrar");
const eliminarOperador = async () => {
  try {
    showLoading(true, "Eliminando...");
    changeBtnLoader();
    const datos = {
      id: props.operadorObj.id,
    };
    const res = await eliminar(datos);
    if (res.exito) {
      mostrarMensaje(res.mensaje);
      changeBtnLoader(false);
      emit("cerrar");
    }
  } catch (error) {
    changeBtnLoader(false);
  } finally {
    showLoading(false);
  }
};
</script>
