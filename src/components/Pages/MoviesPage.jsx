import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../common/NavBar";
import MovieCard from "../common/MovieCard";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";

const MoviesPage = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { allMovies, isLoading } = useSelector((state) => state.home); // Using isLoading from redux state

  const [movie, setMovie] = useState(null);
  const [recommendedArray, setRecommendedArray] = useState([]);

  // Fetch movies if not already available
  useEffect(() => {
    const fetchMovies = async () => {
      if (!allMovies || allMovies.length === 0) {
        await dispatch(getAllMoviesApi());
      }
    };
    
    fetchMovies();
  }, [dispatch, allMovies]);
  

  // Filter selected movie and recommended movies
  useEffect(() => {
    if (allMovies && allMovies.length > 0) {
      const selectedMovie = allMovies.find((movie) => movie._id === movie_id);
      if (selectedMovie) {
        setMovie(selectedMovie);
        setRecommendedArray(allMovies.filter((movie) => movie._id !== movie_id));
        
      }
    }
  }, [allMovies, movie_id]);

  // Show loading state while fetching
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      {movie ? (
        <>
          <NavBar />
          <div className="relative w-screen h-[500px] flex justify-center items-center">
            <div className="w-full h-full absolute z-0">
              {/* Left Gradient Overlay */}
              <div className="absolute left-0 w-[60%] h-full bg-gradient-to-r from-black to-[rgb(102,102,102)]"></div>

              {/* Center Image Section */}
              {movie?.thumbnail && (
                <div
                  className="w-[40%] h-full bg-cover bg-center bg-no-repeat absolute right-20 z-10"
                  style={{ backgroundImage: `url(${movie.thumbnail})` }}
                ></div>
              )}
            </div>

            <div className="w-[70%] h-full flex absolute left-10 z-50">
              <div className="flex w-full h-full items-center justify-start p-2 gap-8">
                <img
                  src={movie?.thumbnail || ""}
                  className="w-[250px] h-[80%] rounded-lg"
                  alt={movie?.movieName || "Movie Thumbnail"}
                />

                <div className="flex flex-col h-[80%] p-2">
                  <p className="text-[40px] text-white font-sans font-[600] uppercase">
                    {movie?.movieName}
                  </p>

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

                  <div className="flex text-white font-[400] text-[20px] p-1">
                    {movie?.genres?.map((genre, index) => (
                      <p key={index}>{`${genre},`}</p>
                    ))}
                  </div>

                  <button className="text-[18px] rounded-md text-white bg-[rgb(245,69,100)] font-medium leading-[24px] tracking-[0.2px] p-[12px_8px] whitespace-nowrap overflow-hidden text-ellipsis">
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
            {recommendedArray?.map((recommmovie) => (
              <MovieCard movie={recommmovie} key={recommmovie._id} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">Movie not found</div>
      )}
    </div>
  );
};

export default MoviesPage;
