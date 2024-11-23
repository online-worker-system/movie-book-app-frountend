import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);

  useEffect(() => {
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

    fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <HomeSlider />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="custom-loader text-center"></div>
        </div>
      ) : (
        <div className="w-full mt-8 sm:mt-10 lg:mt-12 flex items-center justify-center gap-5 lg:gap-8 flex-wrap">
          {allMovies.length ? (
            allMovies.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
