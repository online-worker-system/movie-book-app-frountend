import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/apiConnector";
import { toast } from "react-hot-toast";
import { adminendpoints } from "../api";

const {
  GET_ALL_CINEMAS_API,
  ADD_CINEMA_API,
  UPDATE_SCREEN_API,
  ADD_SHOW_API,
  LIVE_YOUR_SHOW_API,
} = adminendpoints;

// set this in api call to handle formData in server
// {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// }

export const getAllCinemas = createAsyncThunk(
  "cinema/getCinemaDetails",
  async ({ rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(GET_ALL_CINEMAS_API);
      console.log("getCinemaDetails Response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("getCinemaDetails error:", error);
      return rejectWithValue(error.message || "Error during getCinemaDetails");
    }
  }
);

export const addCinema = createAsyncThunk(
  "cinema/addCinema",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_CINEMA_API, formData);
      console.log("addCinema res: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Cinema Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addCinema error:", error);
      return rejectWithValue(error.message || "Error while adding cinema");
    }
  }
);

export const updateScreen = createAsyncThunk(
  "cinema/updateScreen",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(UPDATE_SCREEN_API, formData);
      console.log("addCinema res: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Screen Updated Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("updateScreen error:", error);
      return rejectWithValue(error.message || "Error while updating screen");
    }
  }
);

export const addShow = createAsyncThunk(
  "show/addShow",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADD_SHOW_API, formData);
      console.log("addShow Response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Show Added Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("addShow error:", error);
      return rejectWithValue(error.message || "Error while adding show");
    }
  }
);

export const liveYourShow = createAsyncThunk(
  "show/liveYourShow",
  async (showId, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(LIVE_YOUR_SHOW_API, showId);
      console.log("liveYourShow Response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Show Lived Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("liveYourShow error:", error);
      return rejectWithValue(error.message || "Error while live show");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    allCinemas: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ------------------- getCinemaDetails -------------------
      .addCase(getAllCinemas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCinemas.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCinemas.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- addCinema -------------------
      .addCase(addCinema.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCinema.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCinema.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- updateScreen -------------------
      .addCase(updateScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateScreen.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateScreen.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- addShow -------------------
      .addCase(addShow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addShow.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addShow.rejected, (state) => {
        state.isLoading = false;
      })

      // ------------------- liveYourShow -------------------
      .addCase(liveYourShow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(liveYourShow.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(liveYourShow.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminSlice.reducer;
