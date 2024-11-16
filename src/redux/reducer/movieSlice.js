import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { toast } from "react-hot-toast";
import { movieEndPoins, adminendpoints } from "../api";

const { ADD_MOVIE_API, UPDATE_MOVIE_API, GET_MOVIE_DETAILS } = movieEndPoins;
const { ADD_CITY_API } = adminendpoints;

// Initial state
const initialState = {
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
  movie: {},
};

// Async thunk to fetch all movies from the API
export const fetchMovieApi = createAsyncThunk(
  "movie/fetchMovies",
  async ({ movieId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(GET_MOVIE_DETAILS, { movieId });
      console.log("fetchMovies res: ", response.data);
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

//update movie
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (movieFormData, { dispatch, rejectWithValue }) => {
    console.log(movieFormData);
    try {
      const response = await AxiosInstance.put(UPDATE_MOVIE_API, movieFormData);
      return response.data; // Assuming the response contains the updated movie info or a success message
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to update movie"
        );
      } else {
        return rejectWithValue("Network error");
      }
    }
  }
);

// Async action to submit the movie form
export const submitMovieForm = createAsyncThunk(
  "movie/addMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_MOVIE_API, formData);
      return response.data; // Return response on success
    } catch (error) {
      return rejectWithValue(error.message || "Failed to submit movie");
    }
  }
);

export const addCity = createAsyncThunk(
  "cinema/addCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_CITY_API, { cityName });
      console.log("addCity res: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("City Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addCity error:", error);
      return rejectWithValue(error.message || "Error while adding city");
    }
  }
);

// Reducer and actions
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setMovie: (state, action) => {
      state.movie = action.payload.data;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = {};
      })
      .addCase(fetchMovieApi.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.data;
        const movie = action.payload.data;

        state.movieName = movie.movieName;
        state.releaseDate = movie.releaseDate;
        state.summary = movie.summary;
        state.castMembers = movie.castMembers;
        state.supportingLanguages = movie.supportingLanguages;
        state.thumbnailImage = movie.thumbnailImage;
        state.genres = movie.genres;

        state.error = null;
      })
      .addCase(fetchMovieApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, setLoading, setMovie } = movieSlice.actions;
export default movieSlice.reducer;
