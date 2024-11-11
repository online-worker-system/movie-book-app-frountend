import React, { useEffect } from "react";
import NavBar from "./common/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesApi } from "../redux/reducer/homeSlice";
import HomeSlider from "./common/HomeSlider";

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

  console.log("All movies fetched", allMovies);
  return (
    <div>
      <NavBar />
      <HomeSlider></HomeSlider>
      {/* <h1>Recommended Movies</h1> */}
      <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
        {allMovies.length ? (
          allMovies.map((movie) => (
            <div key={movie._id}>
              <div className="w-[220px] h-[370px]">
                <img
                  src={movie.thumbnail}
                  className="w-[100%] h-[100%] object-cover rounded-lg"
                ></img>
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[20px] font-[500]">
                  {movie.movieName}
                </span>
                <div className="flex items-start justify-center">
                  {movie.genres.map((genre, index) => (
                    <div key={index} className="flex items-center justify-center text-[rgb(105,105,100)] font-[400]">
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
