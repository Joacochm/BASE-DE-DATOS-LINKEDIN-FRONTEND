import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCountriesApi, createCountryApi } from "../../api/countriesApi";


export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    return await fetchCountriesApi();
  }
);

export const createCountry = createAsyncThunk(
  "countries/createCountry",
  async (countryData) => {
    return await createCountryApi(countryData);
  }
);

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCountries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // createCountry
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.countries.push(action.payload);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
