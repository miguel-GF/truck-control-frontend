<template>
  <TheDialog
    :mostrar="mostrar"
    titulo="Cerrar Nómina Operador"
    tipo="warning"
    @cerrar="cerrarModal()"
    @confirmar="cerrar()"
  >
    <template #default>
      <div>
        {{
          `Está apunto de cerrar la nómina ${nominaOperadorObj.serie_folio} - del periodo ${nominaOperadorObj.inicio_fecha} al ${nominaOperadorObj.fin_fecha}`
        }}
      </div>
      <div>¿Desea continuar?</div>
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
const { cerrarNomina } = useNominaOperador;
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
const emit = defineEmits(["cerrar", "confirmar", "exito"]);
const showLoading = inject("$showLoading");
const mostrarMensaje = inject("$mostrarMensaje");
const cerrarModal = () => emit("cerrar");
const cerrar = async () => {
  try {
    showLoading(true, "Cerrando ...");
    changeBtnLoader();
    const datos = {
      id: props.nominaOperadorObj.id,
      status: 400,
    };
    const res = await cerrarNomina(datos);
    if (res.exito) {
      const { datos } = res;
      mostrarMensaje(res.mensaje);
      changeBtnLoader(false);
      emit("exito", datos.datosPrincipales);
    }
  } catch (error) {
    changeBtnLoader(false);
  } finally {
    showLoading(false);
  }
};
</script>
