import axios from "axios";

// Base URL
const API_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/departamentos/pais/`;

export const fetchDepartmentsApi = async (uuid) => {
  const response = await axios.get(`${API_URL}${uuid}`);
  return response.data;
};
