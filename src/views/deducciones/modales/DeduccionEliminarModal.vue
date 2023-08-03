<template>
  <TheDialog
    :mostrar="mostrar"
    titulo="Eliminar Deducción"
    tipo="error"
    @cerrar="cerrar()"
    @confirmar="eliminarDeduccion()"
  >
    <template #default>
      <div>
        Eliminará la deducción
        {{
          `${deduccionObj.serie_folio || "--"} - ${
            deduccionObj.nombre_deduccion || "--"
          }`
        }}
      </div>
      <div>
        {{ `Asociado al operador ${deduccionObj.nombre_operador || "--"}` }}
      </div>
    </template>
  </TheDialog>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "@/importsVue";
import { useDeduccionStore } from "@/stores/deduccionStore";
import { useAppStore } from "@/stores/appStore.js";
const useDeduccion = useDeduccionStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { eliminar } = useDeduccion;
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
const emit = defineEmits(["cerrar", "confirmar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const cerrar = () => emit("cerrar");
const eliminarDeduccion = async () => {
  try {
    showLoading(true, "Eliminando...");
    changeBtnLoader();
    const datos = {
      id: props.deduccionObj.id,
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
