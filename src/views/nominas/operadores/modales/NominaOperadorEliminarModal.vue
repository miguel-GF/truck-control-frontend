<template>
  <TheDialog
    :mostrar="mostrar"
    titulo="Eliminar Nómina Operador"
    tipo="error"
    @cerrar="cerrar()"
    @confirmar="eliminar()"
  >
    <template #default>
      <div>
        Eliminará la nómina
        {{
          `${nominaOperadorObj.serie_folio} - del periodo ${nominaOperadorObj.inicio_fecha} al ${nominaOperadorObj.fin_fecha}`
        }}
      </div>
    </template>
  </TheDialog>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "@/importsVue";
import { useNominaOperadorStore } from "@/stores/nominaOperadorStore.js";
import { useAppStore } from "@/stores/appStore.js";
const useNominaOperador = useNominaOperadorStore();
const useApp = useAppStore();
const { changeBtnLoader } = useApp;
const eliminarNomina = useNominaOperador.eliminar;
const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false,
  },
  nominaOperadorObj: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["cerrar", "confirmar"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const cerrar = () => emit("cerrar");
const eliminar = async () => {
  try {
    showLoading(true, "Eliminando...");
    changeBtnLoader();
    const datos = {
      id: props.nominaOperadorObj.id,
    };
    const res = await eliminarNomina(datos);
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
