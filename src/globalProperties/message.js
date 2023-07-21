import { ElMessage } from "element-plus";

const obtenerTipo = (tipo) => {
  switch (tipo) {
    case "exito":
    case "success":
      return "success";
    case "advertencia":
    case "warning":
      return "warning";
    case "error":
    case "danger":
      return "danger";
    default:
      return "info";
  }
};

// Método para mostrar mensajes de Exito/Error etc
export const mostrarMensaje = (mensaje, tipo = "exito") => {
  return ElMessage({
    message: mensaje,
    type: obtenerTipo(tipo),
    showClose: true,
    grouping: true,
  });
};
