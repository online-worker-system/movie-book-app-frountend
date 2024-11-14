import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";
import { getAllMovies } from "../../redux/reducer/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await dispatch(getAllMovies());

      if (getAllMovies.fulfilled.match(result)) {
      } else {
        console.log("Data not fetched", result.payload || result.error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <HomeSlider />
      {/* <h1>Recommended Movies</h1> */}
      <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
