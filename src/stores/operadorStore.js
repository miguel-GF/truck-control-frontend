import { defineStore } from "pinia";
import { ref } from "vue";
import { get } from "../api/api";

export const useOperadorStore = defineStore("operadores", () => {
  const operadores = ref([]);
  const listar = async () => {
    try {
      const { datos } = await get("operadores");
      operadores.value = datos;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    operadores,
    listar,
  };
});
