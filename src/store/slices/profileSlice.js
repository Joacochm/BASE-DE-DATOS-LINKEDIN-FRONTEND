import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentProfileImageApi,
  uploadProfileImageApi,
  getCurrentCoverImageApi,
  uploadCoverImageApi,
} from "../../api/profileApi";

export const fetchProfileImage = createAsyncThunk(
  "images/fetchProfileImage",
  async (uuid) => {
    return await getCurrentProfileImageApi(uuid);
  }
);

export const uploadProfileImage = createAsyncThunk(
  "images/uploadProfileImage",
  async (imageData) => {
    return await uploadProfileImageApi(imageData);
  }
);


export const fetchCoverImage = createAsyncThunk(
  "images/fetchCoverImage",
  async (uuid) => {
    return await getCurrentCoverImageApi(uuid);
  }
);

export const uploadCoverImage = createAsyncThunk(
  "images/uploadCoverImage",
  async (imageData) => {
    return await uploadCoverImageApi(imageData);
  }
);

const initialState = {
  profileImage: null,
  coverImage: null,
  loadingProfile: false,
  loadingCover: false,
  errorProfile: null,
  errorCover: null,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state, type) => {
      state[`loading${type}`] = true;
      state[`error${type}`] = null;
    };
    const handleRejected = (state, action, type) => {
      state[`loading${type}`] = false;
      state[`error${type}`] = action.error.message || "Error desconocido";
    };

    builder
      // Perfil - fetch
      .addCase(fetchProfileImage.pending, (state) => handlePending(state, "Profile"))
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.profileImage = action.payload || null;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => handleRejected(state, action, "Profile"))

      // Perfil - upload
      .addCase(uploadProfileImage.pending, (state) => handlePending(state, "Profile"))
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.profileImage = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => handleRejected(state, action, "Profile"))

      // Portada - fetch
      .addCase(fetchCoverImage.pending, (state) => handlePending(state, "Cover"))
      .addCase(fetchCoverImage.fulfilled, (state, action) => {
        state.loadingCover = false;
        state.coverImage = action.payload || null;
      })
      .addCase(fetchCoverImage.rejected, (state, action) => handleRejected(state, action, "Cover"))

      // Portada - upload
      .addCase(uploadCoverImage.pending, (state) => handlePending(state, "Cover"))
      .addCase(uploadCoverImage.fulfilled, (state, action) => {
        state.loadingCover = false;
        state.coverImage = action.payload;
      })
      .addCase(uploadCoverImage.rejected, (state, action) => handleRejected(state, action, "Cover"));
  },
});

export default imagesSlice.reducer;
