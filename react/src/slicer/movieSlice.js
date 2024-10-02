import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
      },
    };

    try {
      const popularMoviesResponse = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US",
        options
      );

      const topRatedResponse = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=2",
        options
      );

      const airingTodayResponse = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3",
        options
      );

      return {
        popularMovies: popularMoviesResponse.data.results,
        topRated: topRatedResponse.data.results,
        airingToday: airingTodayResponse.data.results,
      };
    } catch (error) {
      return rejectWithValue({ message: "Failed to fetch movies", error });
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    topRated: [],
    airingToday: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload.popularMovies;
        state.topRated = action.payload.topRated;
        state.airingToday = action.payload.airingToday;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export default movieSlice.reducer;
