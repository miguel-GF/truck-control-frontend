// Función para validar un input que no es obligatorio pero que al introducir
// información requiere validación/es específicas
// Ejemplo: campo teléfono no obligtoria pero que es de 10 dígitos o un email
export const validarInputNoObligatorio = (rules, obj, field) => {
  if (obj[field]) {
    rules[field][0].trigger = "change";
  } else {
    rules[field][0].trigger = "blur";
  }
};
