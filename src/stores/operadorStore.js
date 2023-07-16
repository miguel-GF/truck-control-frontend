import { defineStore } from "pinia";
import { ref } from "@/importsVue";
import { get, post, patch } from "../api/api";

export const useOperadorStore = defineStore("operadores", () => {
  const operadores = ref([]);
  const filtradosOperadores = ref([]);
  const listar = async () => {
    try {
      const { datos } = await get("operadores");
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
      const respuesta = await post("operadores", datos);
      operadores.value.push(respuesta.datos);
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };
  const editar = async (datosEditar) => {
    try {
      const respuesta = await patch("operadores", datosEditar);
      const { datos } = respuesta;
      const index = operadores.value.findIndex((o) => o.id == datos.id);
      if (index >= 0) {
        operadores.value[index].nombre_operador = datos.nombre_operador;
        operadores.value[index].nombre = datos.nombre;
        operadores.value[index].apellidos = datos.apellidos;
        operadores.value[index].telefono = datos.telefono;
      }
      operadores.value.push(respuesta.datos);
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
  };
});
