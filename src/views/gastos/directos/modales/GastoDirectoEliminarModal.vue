<template>
  <TheDialog
    :mostrar="mostrar"
    titulo="Eliminar Gasto Directo"
    tipo="error"
    @cerrar="cerrar()"
    @confirmar="eliminarGastoDirecto()"
  >
    <template #default>
      <div>
        Eliminará el gasto directo
        {{
          `${gastoObj.serie_folio || "--"} - ${
            gastoObj.nombre_gasto_directo || "--"
          }`
        }}
      </div>
      <div>
        {{ `Asociado al operador ${gastoObj.nombre_operador || "--"}` }}
      </div>
    </template>
  </TheDialog>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "@/importsVue";
import { useGastoDirectoStore } from "@/stores/gastoDirectoStore";
import { useAppStore } from "@/stores/appStore.js";
const useGastoDirecto = useGastoDirectoStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const { eliminar } = useGastoDirecto;
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
const emit = defineEmits(["cerrar", "confirmar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const cerrar = () => emit("cerrar");
const eliminarGastoDirecto = async () => {
  try {
    showLoading(true, "Eliminando...");
    changeBtnLoader();
    const datos = {
      id: props.gastoObj.id,
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
