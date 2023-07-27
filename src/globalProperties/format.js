//Método para formatear números y moneda
export const formatearNumero = (value, tipo = "number") => {
  if (!value) return Intl.NumberFormat("es-MX").format(0);
  return value && tipo == "number"
    ? Intl.NumberFormat("es-MX").format(value)
    : Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
};
