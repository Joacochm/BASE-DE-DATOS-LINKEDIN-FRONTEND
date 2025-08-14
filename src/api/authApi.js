import axios from "axios";

// Base URL
const API_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/auth/login`;

export const authLogin = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
