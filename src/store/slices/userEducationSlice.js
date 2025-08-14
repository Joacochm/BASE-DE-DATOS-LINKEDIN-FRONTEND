import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api`;

// Thunks asincrónicos para educación
export const createUserEducation = createAsyncThunk(
  "userEducation/create",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/user-educacion`, userData);
    return response.data;
  }
);

export const getUserEducation = createAsyncThunk(
  "userEducation/fetchByUuid",
  async (uuid) => {
    const response = await axios.get(
      `${BASE_URL}/user-educacion/educacion/${uuid}/`
    );
    return response.data;
  }
);

export const updateUserEducation = createAsyncThunk(
  "userEducation/update",
  async ({ id, data }) => {
    const response = await axios.patch(
      `${BASE_URL}/user-educacion/${id}`,
      data
    );
    return response.data;
  }
);

export const deleteUserEducation = createAsyncThunk(
  "userEducation/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}/user-educacion/${id}/`);
    return id; // Retornamos solo el ID eliminado
  }
);

const userEducationSlice = createSlice({
  name: "userEducation",
  initialState: {
    educationList: [],
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
      // createUserEducation
      .addCase(createUserEducation.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createUserEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.educationList.push(action.payload);
      })
      .addCase(createUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creando educación";
      })

      // getUserEducation
      .addCase(getUserEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educationList = action.payload;
      })
      .addCase(getUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando educación";
      })

      // updateUserEducation
      .addCase(updateUserEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserEducation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.educationList.findIndex(
          (edu) => edu.id === action.payload.id
        );
        if (index !== -1) {
          state.educationList[index] = action.payload;
        }
      })
      .addCase(updateUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error actualizando educación";
      })

      // deleteUserEducation
      .addCase(deleteUserEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserEducation.fulfilled, (state, action) => {
        state.loading = false;
        // Filtramos el array para remover el item con el ID recibido
        state.educationList = state.educationList.filter(
          (edu) => edu.id !== action.payload
        );
      })
      .addCase(deleteUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error eliminando educación";
      });
  },
});

export const { resetCreateSuccess, clearError } = userEducationSlice.actions;

export default userEducationSlice.reducer;
