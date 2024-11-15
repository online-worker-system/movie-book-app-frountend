import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import homeReducer from "../reducer/homeSlice";
import movieReducer from "../reducer/movieSlice";
import adminReducer from "../reducer/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    movie: movieReducer,
    admin: adminReducer,
  },
});
