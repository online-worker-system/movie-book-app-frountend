import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosInstance from "../utils/apiConnector";

// Initial state
const initialState = {
  cinemas: [],
  loading: false,
  error: null,
  movieDetailes: {},
};

// Async thunk to fetch all movies from the API
export const fetchShowDetailes = createAsyncThunk(
  "show/cinema",
  async ({ movieId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://movie-book-app-backend.vercel.app/api/v1/movie/getMovieCinema",
        { movieId }
      );
      return response.data; // Return the movie data if successful
    } catch (error) {
      // Handle errors properly
      if (error.response) {
        // The request was made, but the server responded with an error status
        return rejectWithValue(
          error.response.data.message || "Failed to fetch movies"
        );
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue("No response from server");
      } else {
        // Something else happened while setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

// Reducer and actions
const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    setCinemas: (state, action) => {
      state.cinemas = action.payload.data.cinemas;
    },
    setMovieDetailes: (state, action) => {
      state.movieDetailes = action.payload.data.movieDetailes;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowDetailes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowDetailes.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetailes = action.payload.data.movieDetails;
        state.cinemas = action.payload.data.cinemas;
        state.error = null;
      })
      .addCase(fetchShowDetailes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCinemas, setMovieDetailes, setLoading } = showSlice.actions;
export default showSlice.reducer;
