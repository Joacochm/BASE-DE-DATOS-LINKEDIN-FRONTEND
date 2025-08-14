import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api`;

// Thunks asincrónicos
export const createUserExperience = createAsyncThunk(
  "userExperience/create",
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/user-experiencia`, userData);
    return response.data;
  }
);

export const getUserExperiences = createAsyncThunk(
  "userExperience/fetchByUuid",
  async (uuid) => {
    const response = await axios.get(`${BASE_URL}/user-experiencia/experiencias/${uuid}/`);
    return response.data;
  }
);

export const updateUserExperience = createAsyncThunk(
  "userExperience/update",
  async ({ id, data }) => {
    const response = await axios.patch(`${BASE_URL}/user-experiencia/${id}`, data);
    return response.data;
  }
);

export const deleteUserExperience = createAsyncThunk(
  "userExperience/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}/user-experiencia/${id}/`);
    return id; // Retornamos solo el ID eliminado
  }
);

const userExperienceSlice = createSlice({
  name: "userExperience",
  initialState: {
    experiences: [],
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
      // createUserExperience
      .addCase(createUserExperience.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createUserExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.experiences.push(action.payload);
      })
      .addCase(createUserExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creando experiencia";
      })

      // getUserExperiences
      .addCase(getUserExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(getUserExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando experiencias";
      })

      // updateUserExperience
      .addCase(updateUserExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserExperience.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.experiences.findIndex(
          (exp) => exp.id === action.payload.id
        );
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
      })
      .addCase(updateUserExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error actualizando experiencia";
      })

      // deleteUserExperience
      .addCase(deleteUserExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter(
          (exp) => exp.id !== action.payload
        );
      })
      .addCase(deleteUserExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error eliminando experiencia";
      });
  },
});

export const { resetCreateSuccess, clearError } = userExperienceSlice.actions;

export default userExperienceSlice.reducer;
