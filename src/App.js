import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import MoviesPage from "./components/Pages/MoviesPage";
import AddMoviePage from "./components/Pages/AddMoviePage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddCinema from "./components/admin/AddCinema";
import { Toaster } from "react-hot-toast";
import "./index.css";

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
        <Route path="/cinema/addCinema" element={<AddCinema />}></Route>
        <Route
          path="/movie/:movie_name/:movie_id"
          element={<MoviesPage />}
        ></Route>
        <Route path="/movie/addMovie" element={<AddMoviePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
