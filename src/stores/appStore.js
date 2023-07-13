import { defineStore } from "pinia";
import { ref } from "@/importsVue";

export const useAppStore = defineStore("app", () => {
  const isMobile = ref(false);
  const setIsMobile = async (value) => (isMobile.value = value);
  return {
    isMobile,
    setIsMobile,
  };
});
