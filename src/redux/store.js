import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import adminReducer from "./reducer/adminSlice";
import movieReducer from "./reducer/movieSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    movie: movieReducer,
  },
});
