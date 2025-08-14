import axios from "axios";

// Base URL
const API_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/auth`;

export const fetchUsersApi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUserApi = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
