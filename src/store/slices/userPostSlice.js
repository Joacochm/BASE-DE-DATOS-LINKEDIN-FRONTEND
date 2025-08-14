// slices/postUserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_CONFIG_BACKEND_URL}/linkedin-api/posts-users`;

// Crear Post
export const createPostUser = createAsyncThunk(
  "postUser/create",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/crear`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

// Obtener posts de un usuario
export const getPostUser = createAsyncThunk(
  "postUser/fetchByUserId",
  async (userId) => {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  }
);

// Obtener todos los posts
export const getPosts = createAsyncThunk("postUser/fetchAll", async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

// slices/postUserSlice.js

// Actualizar Post
export const updatePostUser = createAsyncThunk(
  "postUser/update",
  async ({ userId, id, content, files }) => {
    const formData = new FormData();
    if (content) formData.append("content", content);
    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }
    const response = await axios.patch(
      `${BASE_URL}/actualizar/${userId}/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  }
);

// Eliminar Post
export const deletePostUser = createAsyncThunk(
  "postUser/delete",
  async ({ userId, id }) => {
    await axios.delete(`${BASE_URL}/eliminar/${userId}/${id}`);
    return id;
  }
);


const postUserSlice = createSlice({
  name: "postUser",
  initialState: {
    postList: [],
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
      // Crear post
      .addCase(createPostUser.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createPostUser.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.postList.unshift(action.payload);
      })
      .addCase(createPostUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creando post";
      })

      // Obtener posts de un usuario
      .addCase(getPostUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostUser.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload;
      })
      .addCase(getPostUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando posts";
      })

      // Actualizar post
      .addCase(updatePostUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postList.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) state.postList[index] = action.payload;
      })
      .addCase(updatePostUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error actualizando post";
      })

      // Eliminar post
      .addCase(deletePostUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostUser.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = state.postList.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePostUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error eliminando post";
      })

      // Obtener todos los posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error cargando posts";
      });
  },
});

export const { resetCreateSuccess, clearError } = postUserSlice.actions;
export default postUserSlice.reducer;
