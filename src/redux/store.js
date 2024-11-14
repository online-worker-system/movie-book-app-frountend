import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import homeReducer from "./reducer/homeSlice";
import adminReducer from "./reducer/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    admin: adminReducer,
  },
});
