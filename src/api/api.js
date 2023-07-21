import { mostrarMensaje } from "../globalProperties/message";
const BASE_URL = "http://localhost:8000/api/v1";

const sendRequest = async (url, method = "POST", data = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, config);
    const res = await response.json();
    if (!res.exito) {
      throw new Error(res.mensaje);
    } else if (!response.ok) {
      const mensaje = obtenerMensajeRespuesta(response);
      throw new Error(mensaje);
    }

    return res;
  } catch (error) {
    mostrarMensaje(error.message, "error");
    throw new Error(error.message);
  }
};

const sendRequestGet = async (url, method = "GET", params = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let fullPath = `${BASE_URL}/${url}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    fullPath = `${BASE_URL}/${url}?${queryString}`;
  }

  try {
    const response = await fetch(fullPath, config);
    if (!response.ok) {
      const mensaje = obtenerMensajeRespuesta(response);
      throw new Error(mensaje);
    }

    return response.json();
  } catch (error) {
    mostrarMensaje(error.message, "error");
    throw new Error(error.message);
  }
};

const sendRequestPatch = async (url, method = "PATCH", data = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const id = data.id;
  delete data.id;

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}/${id}`, config);
    const res = await response.json();
    if (!res.exito) {
      throw new Error(res.mensaje);
    } else if (!response.ok) {
      const mensaje = obtenerMensajeRespuesta(response);
      throw new Error(mensaje);
    }

    return res;
  } catch (error) {
    mostrarMensaje(error.message, "error");
    throw new Error(error.message);
  }
};

export const get = (url, params) => sendRequestGet(url, "GET", params);
export const post = (url, data) => sendRequest(url, "POST", data);
export const del = (url, data) => sendRequestPatch(url, "DELETE", data);
export const patch = (url, data) => sendRequestPatch(url, "PATCH", data);

const obtenerMensajeRespuesta = ({ status }) => {
  switch (Number(status)) {
    case 400:
      return "Bad request";
    case 404:
      return "Not Found";
    case 500:
      return "Error de servidor";
    default:
      return "Error en la solicitud";
  }
};
