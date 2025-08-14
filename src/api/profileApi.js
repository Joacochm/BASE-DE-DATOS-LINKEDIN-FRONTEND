import axios from "axios";

const BASE_URL = import.meta.env.VITE_CONFIG_BACKEND_URL + "/linkedin-api";

export const uploadProfileImageApi = async ({ uuid, file }) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${BASE_URL}/profile-images/upload/${uuid}/`;

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getCurrentProfileImageApi = async (uuid) => {
  const url = `${BASE_URL}/profile-images/current/${uuid}/`;
  const response = await axios.get(url);
  return response.data;
};

export const uploadCoverImageApi = async ({ uuid, file }) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${BASE_URL}/imagenes-portadas/upload/${uuid}/`;

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getCurrentCoverImageApi = async (uuid) => {
  const url = `${BASE_URL}/imagenes-portadas/current/${uuid}/`;
  const response = await axios.get(url);
  return response.data;
};
