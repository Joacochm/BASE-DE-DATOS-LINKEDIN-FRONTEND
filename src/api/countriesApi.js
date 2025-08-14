import axios from "axios";

// Base URL
const API_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/pais`;

export const fetchCountriesApi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCountryApi = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
