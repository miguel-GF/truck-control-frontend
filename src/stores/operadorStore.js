import { defineStore } from "pinia";
import { ref } from "@/importsVue";
import { get, post, patch, del } from "../api/api";

const endPoint = "operadores";
export const useOperadorStore = defineStore("operadores", () => {
  const operadores = ref([]);
  const filtradosOperadores = ref([]);
  const listar = async (params = null) => {
    try {
      const { datos } = await get(endPoint, params);
      operadores.value = datos;
      filtradosOperadores.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  const filtrarListar = async (busqueda) =>
    (filtradosOperadores.value = operadores.value.filter(
      (data) =>
        !busqueda.value ||
        data.nombre_operador
          .toLowerCase()
          .includes(busqueda.value.toLowerCase()) ||
        String(data.clave).toLowerCase().includes(busqueda.value.toLowerCase())
    ));
  const agregar = async (datos) => {
    try {
      const respuesta = await post(endPoint, datos);
      operadores.value.push(respuesta.datos);
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
      const index = operadores.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        operadores.value[index].nombre_operador = datos.nombre_operador;
        operadores.value[index].nombre = datos.nombre;
        operadores.value[index].apellidos = datos.apellidos;
        operadores.value[index].telefono = datos.telefono;
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
      const index = operadores.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        operadores.value[index].status = datos.status;
        operadores.value[index].status_nombre = datos.status_nombre;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    operadores,
    filtradosOperadores,
    listar,
    filtrarListar,
    agregar,
    editar,
    eliminar,
  };
});
