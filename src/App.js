import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Pages/Home";
import MoviesPage from "./components/Pages/MoviesPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddCinema from "./components/admin/AddCinema";
import AddMoviePage from "./components/superadmin/AddMoviePage";
import UpdateMoviePage from "./components/superadmin/UpdateMoviePage";
import AddCity from "./components/Pages/AddCity";
import UpdateScreen from "./components/Pages/UpdateScreen";
import AdminProtected from "./components/protected/AdminProtected";
import SuperAdminProtected from "./components/protected/SuperAdminProtected";
import ShowSeats from "./components/Pages/ShowSeats";
import CinemasShowPage from "./components/Pages/CinemasShowPage";
function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <div>
        <Toaster position="top-center" />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/otp" element={<CustomOtpInput />}></Route>
        <Route
          path="/movie/:movieName/:movie_id"
          element={<MoviesPage />}
        ></Route>
        <Route
          path="/buytickets/:movie_id/:cinema_id/seats"
          element={<ShowSeats />}
        ></Route>

        <Route path="/shows/:movieName/:movie_id" element={<CinemasShowPage></CinemasShowPage>}></Route>
        <Route
          path="/movie/addMovie"
          element={
            <SuperAdminProtected>
              <AddMoviePage />
            </SuperAdminProtected>
          }
        ></Route>
        <Route
          path="/movie/updatemovie/:movie_id"
          element={
            <SuperAdminProtected>
              <UpdateMoviePage />
            </SuperAdminProtected>
          }
        ></Route>
        <Route
          path="/addCity"
          element={
            <SuperAdminProtected>
              <AddCity />
            </SuperAdminProtected>
          }
        ></Route>
        <Route
          path="/addCinema"
          element={
            <AdminProtected>
              <AddCinema />
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/updateScreen"
          element={
            <AdminProtected>
              <UpdateScreen />
            </AdminProtected>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
