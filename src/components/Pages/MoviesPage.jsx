import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../common/NavBar";
import MovieCard from "../common/MovieCard";
import { getAllMovies } from "../../redux/reducer/movieSlice";

const MoviesPage = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { movies } = useSelector((state) => state.movie);

  const [movie, setMovie] = useState(null);
  const [recommendedArray, setRecommendedArray] = useState([]);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      dispatch(getAllMovies());
    }
  }, [dispatch, movies]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const recommendedArray = movies.filter((movie) => movie._id !== movie_id);
      const selectedMovie = movies.find((movie) => movie._id === movie_id);
      setRecommendedArray(recommendedArray);
      setMovie(selectedMovie);
    }
  }, [movies, movie_id]);

  return (
    <div>
      <NavBar />
      <div className="relative w-screen h-[500px] flex justify-center items-center">
        <div className="w-full h-full absolute z-0">
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 w-[60%] h-full bg-gradient-to-r from-black to-[rgb(102,102,102)]"></div>

          {/* Center Image Section */}
          <div
            className="w-[40%] h-full bg-cover bg-center bg-no-repeat absolute right-20 z-10"
            style={{ backgroundImage: `url(${movie?.thumbnail})` }}
          ></div>

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 w-[10%] h-full bg-gradient-to-l from-black to-[rgb(102,102,102)] z-20"></div>
        </div>

        <div className="w-[70%] h-full flex absolute left-10 z-50">
          <div className="flex w-full h-full items-center justify-start p-2 gap-8">
            <img
              src={movie?.thumbnail}
              className="w-[250px] h-[80%] rounded-lg"
            ></img>

            <div className="flex flex-col h-[80%] p-2">
              <p className="text-[40px] text-white font-sans font-[600] uppercase">
                {movie?.movieName}
              </p>
              {
                <div className="flex bg-white text-black font-[400] text-[15px] p-1 gap-3">
                  {movie?.supportingLanguages?.map((lang, index) => (
                    <div key={index} className="inline-flex">
                      <p>{lang}</p>
                      {index !== movie?.supportingLanguages.length - 1 && (
                        <p>,&nbsp;</p>
                      )}
                    </div>
                  ))}
                </div>
              }

              {
                <div className="flex text-white font-[400] text-[20px] p-1">
                  {movie?.genres?.map((genre, index) => (
                    <p key={index}>{`${genre},`}</p>
                  ))}
                </div>
              }
              <button className="text-[18px] rounded-md text-white bg-[rgb(245,69,100)] font-medium leading-[24px] tracking-[0.2px] p-[12px_8px] whitespace-nowrap overflow-hidden text-ellipsis">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
          {recommendedArray?.map((recommmovie) => (
            <MovieCard movie={recommmovie} key={recommmovie._id}></MovieCard>
          ))}
        </div>
      }
    </div>
  );
};

export default MoviesPage;
