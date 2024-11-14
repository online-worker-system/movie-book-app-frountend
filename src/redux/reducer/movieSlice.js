import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { toast } from "react-hot-toast";
import { movieendpoints } from "../api";

const { GET_ALL_MOVIES_API, ADD_MOVIE_API, UPDATE_MOVIE_API } = movieendpoints;

const initialState = {
  movies: [],
  movieName: "",
  categories: [],
  releaseDate: "",
  summary: "",
  castMembers: "",
  supportingLanguages: "",
  thumbnailImage: null,
  genres: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all movies from the API
export const getAllMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(GET_ALL_MOVIES_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("fetchMovies error:", error);
      return rejectWithValue(error.message || "Error while fetching movies");
    }
  }
);

// Async thunk to submit the movie form to the API using axios
export const submitMovieForm = createAsyncThunk(
  "movie/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_MOVIE_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addMovie error:", error);
      return rejectWithValue(error.message || "Error while adding movie");
    }
  }
);

// Async thunk to update movie details in the database
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(UPDATE_MOVIE_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("updateMovie error:", error);
      return rejectWithValue(error.message || "Error while updating movie");
    }
  }
);

// Slice to manage form state
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    // Handling fetchMovies async actions
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling submitMovieForm async actions
      .addCase(submitMovieForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitMovieForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitMovieForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling updateMovie async actions
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData } = movieSlice.actions;
export default movieSlice.reducer;
