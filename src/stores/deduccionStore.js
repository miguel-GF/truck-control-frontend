import { defineStore } from "pinia";
import { ref } from "@/importsVue";
import { get, post, patch, del } from "../api/api";

const endPoint = "deducciones";
export const useDeduccionStore = defineStore("deducciones", () => {
  const deducciones = ref([]);
  const filtradosDeducciones = ref([]);
  const catalogo = ref([]);

  const listar = async () => {
    try {
      const { datos } = await get(endPoint);
      deducciones.value = datos;
      filtradosDeducciones.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  const filtrarListar = async (busqueda) =>
    (filtradosDeducciones.value = deducciones.value.filter(
      (data) =>
        !busqueda.value ||
        data.nombre_deduccion
          .toLowerCase()
          .includes(busqueda.value.toLowerCase()) ||
        String(data.nombre_operador)
          .toLowerCase()
          .includes(busqueda.value.toLowerCase()) ||
        String(data.serie_folio)
          .toLowerCase()
          .includes(busqueda.value.toLowerCase())
    ));
  const listarCatalogo = async () => {
    try {
      const { datos } = await get(`${endPoint}/catalogo`);
      catalogo.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  const agregar = async (datos) => {
    try {
      const respuesta = await post(endPoint, datos);
      deducciones.value.push(respuesta.datos);
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  const editar = async (datosEditar) => {
    try {
      const id = datosEditar.id;
      const respuesta = await patch(`${endPoint}/${id}`, datosEditar);
      const { datos } = respuesta;
      const index = deducciones.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        deducciones.value[index].cantidad = datos.cantidad;
        deducciones.value[index].precio = datos.precio;
        deducciones.value[index].total = datos.total;
        deducciones.value[index].aplicacionFecha = datos.aplicacion_fecha;
        deducciones.value[index].comentario = datos.comentario;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  const eliminar = async (datosEditar) => {
    try {
      const id = datosEditar.id;
      const respuesta = await del(`${endPoint}/${id}`, datosEditar);
      const { datos } = respuesta;
      const index = deducciones.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        deducciones.value[index].status = datos.status;
        deducciones.value[index].status_nombre = datos.status_nombre;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    deducciones,
    filtradosDeducciones,
    catalogo,
    listar,
    filtrarListar,
    listarCatalogo,
    agregar,
    editar,
    eliminar,
  };
});
