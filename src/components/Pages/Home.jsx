import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allMovies } = useSelector((state) => state.home);

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

  console.log("All movies fetched", allMovies);

  const movieClickHandler = (movieName, movieId) => {
    navigate(`/movie/${movieName}/${movieId}`);
  };

  return (
    <div>
      <NavBar />
      <HomeSlider></HomeSlider>
      <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
        {allMovies.length ? (
          allMovies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => {
                movieClickHandler(movie.movieName, movie._id);
              }}
            >
              <div className="w-[220px] h-[370px]">
                <img
                  src={movie.thumbnail}
                  className="w-[100%] h-[100%] object-cover rounded-lg"
                  alt={movie.movieName}
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[20px] font-[500]">
                  {movie.movieName}
                </span>
                <div className="flex items-start justify-center">
                  {movie.genres.map((genre, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center text-[rgb(105,105,100)] font-[400]"
                    >
                      <div>{genre}</div>
                      {index !== movie.genres.length - 1 && <div>/</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
