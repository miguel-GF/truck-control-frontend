import { defineStore } from "pinia";
import { ref } from "@/importsVue";

export const useAppStore = defineStore("app", () => {
  const isMobile = ref(false);
  const setIsMobile = async (value) => (isMobile.value = value);
  const btnLoader = ref(false);
  const changeBtnLoader = async (value = true) => (btnLoader.value = value);
  return {
    isMobile,
    setIsMobile,
    btnLoader,
    changeBtnLoader,
  };
});
