import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrailer = createAsyncThunk(
  "trailers/fetchTrailer",
  async ({ id, isMovie }, { rejectWithValue }) => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
      },
    };

    try {
      const url = isMovie
        ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
        : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

      const response = await axios.get(url, options);
      const trailerData = response.data;

      if (trailerData.results && trailerData.results.length > 0) {
        return trailerData.results[0].key; 
      } else {
        return rejectWithValue("Không có trailer nào"); 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.status_message || "Lỗi khi tải trailer");
    }
  }
);

const trailerSlice = createSlice({
  name: "trailers",
  initialState: {
    trailerKey: null,
    error: null,
    modalIsOpen: false,
    loading: false,
  },
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true; 
    },
    closeModal: (state) => {
      state.modalIsOpen = false; 
      state.trailerKey = null; 
      state.error = null; 
      state.loading = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.trailerKey = action.payload; 
        state.error = null; 
        state.loading = false; 
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        state.error = action.payload; 
        state.trailerKey = null; 
        state.loading = false; 
      });
  },
});

export const { openModal, closeModal } = trailerSlice.actions;

export default trailerSlice.reducer;
