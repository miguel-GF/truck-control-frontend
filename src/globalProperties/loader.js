import { ElLoading } from "element-plus";

// Función para mostrar el componente el-loading
export const showLoading = (show, text = "Cargando...") => {
  if (show) {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: true,
      text,
      background: "rgba(0, 0, 0, 0.7)",
    });
    return loadingInstance;
  } else {
    // Cerrar el loading actual
    ElLoading.service().close();
  }
};
