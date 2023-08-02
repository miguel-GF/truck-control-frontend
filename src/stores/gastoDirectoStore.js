import { defineStore } from "pinia";
import { ref } from "@/importsVue";
import { get, post, patch, del } from "../api/api";

const endPoint = "gastos/directos";
export const useGastoDirectoStore = defineStore("gastos-directos", () => {
  const gastosDirectos = ref([]);
  const filtradosGastosDirectos = ref([]);
  const catalogo = ref([]);

  const listar = async () => {
    try {
      const { datos } = await get(endPoint);
      gastosDirectos.value = datos;
      filtradosGastosDirectos.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  const filtrarListar = async (busqueda) =>
    (filtradosGastosDirectos.value = gastosDirectos.value.filter(
      (data) =>
        !busqueda.value ||
        data.nombre_gasto_directo
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
      gastosDirectos.value.push(respuesta.datos);
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
      const index = gastosDirectos.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        gastosDirectos.value[index].cantidad = datos.cantidad;
        gastosDirectos.value[index].precio = datos.precio;
        gastosDirectos.value[index].total = datos.total;
        gastosDirectos.value[index].aplicacionFecha = datos.aplicacion_fecha;
        gastosDirectos.value[index].comentario = datos.comentario;
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
      const index = gastosDirectos.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        gastosDirectos.value[index].status = datos.status;
        gastosDirectos.value[index].status_nombre = datos.status_nombre;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    gastosDirectos,
    filtradosGastosDirectos,
    catalogo,
    listar,
    filtrarListar,
    listarCatalogo,
    agregar,
    editar,
    eliminar,
  };
});
