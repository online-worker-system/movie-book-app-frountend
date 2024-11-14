import React, { useEffect } from "react";
import NavBar from "../common/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";

const Home = () => {
  const dispatch = useDispatch();
  const { allMovies } = useSelector((state) => state.home);

  useEffect(() => {
    // Separate async function to handle API call
    const fetchMovies = async () => {
      const resultAction = await dispatch(getAllMoviesApi());

      if (getAllMoviesApi.fulfilled.match(resultAction)) {
      } else {
        console.log(
          "Data not fetched",
          resultAction.payload || resultAction.error
        );
      }
    };

    fetchMovies(); // Call the async function
  }, [dispatch]);



 
  return (
    <div>
      <NavBar />
      <HomeSlider></HomeSlider>
      {/* <h1>Recommended Movies</h1> */}
      <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
        {allMovies.length ? (
          allMovies.map((movie) => (
           <MovieCard movie={movie}></MovieCard>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
