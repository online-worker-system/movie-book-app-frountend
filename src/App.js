import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Pages/Home";
import MoviesPage from "./components/Pages/MoviesPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddCinema from "./components/Pages/AddCinema";
import AddMoviePage from "./components/superadmin/AddMoviePage";
import UpdateMoviePage from "./components/superadmin/UpdateMoviePage";
import AddCity from "./components/Pages/AddCity";
import UpdateScreen from "./components/Pages/UpdateScreen";
import AdminProtected from "./components/protected/AdminProtected";
import SuperAdminProtected from "./components/protected/SuperAdminProtected";
import ShowSeats from "./components/Pages/ShowSeats";
import AddShow from "./components/Pages/AddShow";
import LiveYourShow from "./components/Pages/LiveYourShow";
import CinemasShowPage from "./components/Pages/CinemasShowPage";
import TermsAndCounditionPage from "./components/Pages/TermsAndCounditionPage";
import TransactionPage from "./components/Pages/TransactionPage";
import TicketBox from "./components/common/TicketBox";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <div>
        <Toaster position="top-center" />
      </div>
      <Routes>
        {/* ------------------ Open Routes ------------------- */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/otp" element={<CustomOtpInput />}></Route>
        <Route
          path="/book/terms-countditions"
          element={<TermsAndCounditionPage></TermsAndCounditionPage>}
        ></Route>
        <Route
          path="/book/transactions"
          element={<TransactionPage></TransactionPage>}
        ></Route>

        <Route
          path="/movie/:movieName/:movie_id"
          element={<MoviesPage />}
        ></Route>
        <Route
          path="/buytickets/:movie_id/:cinema_id/:timing/seats"
          element={<ShowSeats />}
        ></Route>
        <Route
          path="/shows/:movieName/:movie_id"
          element={<CinemasShowPage></CinemasShowPage>}
        ></Route>

        {/* ------------------ Super-Admin Routes ------------------- */}
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

        {/* ------------------ Admin Routes ------------------- */}
        <Route
          path="/cinema/addCinema"
          element={
            <AdminProtected>
              <AddCinema />
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/cinema/updateScreen"
          element={
            <AdminProtected>
              <UpdateScreen />
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/show/addShow"
          element={
            <AdminProtected>
              <AddShow />
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/show/liveYourShow"
          element={
            <AdminProtected>
              <LiveYourShow />
            </AdminProtected>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
