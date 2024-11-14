import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state of the form and movie list
const initialState = {
    movies: [], // Store fetched movie list here
    movieName: '',
    categories: [],
    releaseDate: '',
    summary: '',
    castMembers: '',
    supportingLanguages: '',
    thumbnailImage: null,
    genres: [],
    loading: false,
    error: null,
};

// Async thunk to fetch all movies from the API
export const fetchMovies = createAsyncThunk(
    'movie/fetchMovies',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://movie-book-app-backend.vercel.app/api/v1/movie/getAllMovies'
            );
            return response.data; // Return the movie data if successful
        } catch (error) {
            // Handle errors properly
            if (error.response) {
                // The request was made, but the server responded with an error status
                return rejectWithValue(error.response.data.message || 'Failed to fetch movies');
            } else if (error.request) {
                // The request was made but no response was received
                return rejectWithValue('No response from server');
            } else {
                // Something else happened while setting up the request
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk to update movie details in the database
export const updateMovie = createAsyncThunk(
    'movie/updateMovie',
    async(formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                'https://movie-book-app-backend.vercel.app/api/v1/movie/updateMovie',
                formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data; // Return the updated movie data if successful
        } catch (error) {
            // Handle errors properly
            if (error.response) {
                // The request was made, but the server responded with an error status
                return rejectWithValue(error.response.data.message || 'Failed to update movie');
            } else if (error.request) {
                // The request was made but no response was received
                return rejectWithValue('No response from server');
            } else {
                // Something else happened while setting up the request
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk to submit the movie form to the API using axios
export const submitMovieForm = createAsyncThunk(
    'movie/submitForm',
    async(formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://movie-book-app-backend.vercel.app/api/v1/movie/addMovie',
                formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data; // Return the response data if successful
        } catch (error) {
            // Handle errors properly
            if (error.response) {
                // The request was made, but the server responded with an error status
                return rejectWithValue(error.response.data.message || 'Failed to submit movie');
            } else if (error.request) {
                // The request was made but no response was received
                return rejectWithValue('No response from server');
            } else {
                // Something else happened while setting up the request
                return rejectWithValue(error.message);
            }
        }
    }
);

// Slice to manage form state
const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value; // Update state with new form data
        },
    },
    extraReducers: (builder) => {
        // Handling fetchMovies async actions
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload; // Set the fetched movies to state
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message if API call failed
            })

        // Handling submitMovieForm async actions
        .addCase(submitMovieForm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitMovieForm.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null; // Successfully submitted the form
            })
            .addCase(submitMovieForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message if API call failed
            })

        // Handling updateMovie async actions
        .addCase(updateMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null; // Successfully updated the movie
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message if update failed
            });
    },
});

export const { setFormData } = movieSlice.actions; // Export the action to update form data
export default movieSlice.reducer; // Export the reducer to be added in the store