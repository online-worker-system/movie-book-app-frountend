import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import homeReducer from "../reducer/homeSlice";
import movieReducer from "../reducer/movieSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    movie: movieReducer,
  },
});
