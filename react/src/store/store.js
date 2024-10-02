import { configureStore } from '@reduxjs/toolkit';
import trailerSlice from '../slicer/trailerSlice';
import moviesSlice from '../slicer/movieSlice';

const store = configureStore({
  reducer: {
    trailers: trailerSlice,
    movies: moviesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['trailers/fetchTrailer/rejected'], // Ignore specific actions
        ignoredPaths: ['meta.config.transformRequest'], // Ignore specific paths
      },
    }),
});

export default store;
