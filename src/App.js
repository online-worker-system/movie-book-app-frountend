import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MoviesPage from "./components/Pages/MoviesPage";
import CustomOtpInput from "./components/Auth/CustomOtpInput";
import AddMoviePage from "./components/Pages/AddMoviePage";
import { Toaster } from "react-hot-toast";
import "./index.css";


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <div>
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/otp" element={<CustomOtpInput></CustomOtpInput>}></Route>
        <Route path="/movies/:movie_name/:movie_id" element={<MoviesPage></MoviesPage>}></Route>
        <Route path="/movies/addMovie" element={<AddMoviePage></AddMoviePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
