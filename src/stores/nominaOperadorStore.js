import { defineStore } from "pinia";
import { ref } from "@/importsVue";
import { get, post, patch, del } from "../api/api";

export const useNominaOperadorStore = defineStore("nominas-operadores", () => {
  const endPoint = "nominas/operadores";
  const nominasOperadores = ref([]);
  const filtradosNominasOperadores = ref([]);
  const listar = async (params = null) => {
    try {
      const { datos } = await get(endPoint, params);
      nominasOperadores.value = datos;
      filtradosNominasOperadores.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  const filtrarListar = async (busqueda) =>
    (filtradosNominasOperadores.value = nominasOperadores.value.filter(
      (data) =>
        !busqueda.value ||
        String(data.serie_folio)
          .toLowerCase()
          .includes(busqueda.value.toLowerCase())
    ));
  const agregar = async (datos) => {
    try {
      const respuesta = await post(endPoint, datos);
      nominasOperadores.value.push(respuesta.datos);
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  const editar = async (datosEditar) => {
    try {
      const respuesta = await patch(endPoint, datosEditar);
      const { datos } = respuesta;
      const index = nominasOperadores.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        nominasOperadores.value[index].nombre_operador = datos.nombre_operador;
        nominasOperadores.value[index].nombre = datos.nombre;
        nominasOperadores.value[index].apellidos = datos.apellidos;
        nominasOperadores.value[index].telefono = datos.telefono;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  const eliminar = async (datosEditar) => {
    try {
      const respuesta = await del(endPoint, datosEditar);
      const { datos } = respuesta;
      const index = nominasOperadores.value.findIndex(
        (o) => Number(o.id) === Number(datos.id)
      );
      if (index >= 0) {
        nominasOperadores.value[index].status = datos.status;
        nominasOperadores.value[index].status_nombre = datos.status_nombre;
      }
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    nominasOperadores,
    filtradosNominasOperadores,
    listar,
    filtrarListar,
    agregar,
    editar,
    eliminar,
  };
});
