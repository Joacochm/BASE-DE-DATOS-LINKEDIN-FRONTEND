import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/auth/change-password`;

export const changePassword = async (userData) => {
  try {
    const { data } = await axios.post(API_URL, userData);
    toast.success(data.message || "Contraseña cambiada con éxito");
    return data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "No se pudo cambiar la contraseña";
    toast.error(errMsg[1]);
    throw error.response?.data || { message: errMsg };
  }
};
