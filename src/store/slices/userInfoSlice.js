// src/store/slices/userInfoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api`;

// CREATE
export const createUserInfo = createAsyncThunk(
  "userInfo/create",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/user-info`, userData);
    return response.data;
  }
);

// READ
export const getUserInfo = createAsyncThunk(
  "userInfo/fetchByUuid",
  async (uuid) => {
    const response = await axios.get(`${BASE_URL}/user-info/${uuid}/`);
    return response.data;
  }
);

// UPDATE
export const updateUserInfo = createAsyncThunk(
  "userInfo/update",
  async ({ id, data }) => {
    const response = await axios.patch(`${BASE_URL}/user-info/${id}`, data);
    return response.data;
  }
);

// DELETE
export const deleteUserInfo = createAsyncThunk(
  "userInfo/delete",
  async ({ id, idRegister }) => {
    await axios.delete(`${BASE_URL}/user-info/${id}/`);
    return idRegister;
  }
);


const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    infoList: [],
    loading: false,
    createSuccess: false,
    error: null,
  },
  reducers: {
    resetCreateSuccess(state) {
      state.createSuccess = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createUserInfo.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createUserInfo.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creando información";
      })

      // READ
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.infoList = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando información";
      })

      // UPDATE
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.infoList.findIndex(
          (info) => info.id === action.payload.id
        );
        if (index !== -1) {
          state.infoList[index] = action.payload;
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error actualizando información";
      })

      // DELETE
      .addCase(deleteUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.infoList = state.infoList.filter(
          (info) => info.id !== action.payload
        );
      })
      .addCase(deleteUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error eliminando información";
      });
  },
});

export const { resetCreateSuccess, clearError } = userInfoSlice.actions;

export default userInfoSlice.reducer;
