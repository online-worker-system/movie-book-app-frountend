import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../common/NavBar";
import MovieCard from "../common/MovieCard";
import HomeSlider from "../common/HomeSlider";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";

const MoviesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie_id } = useParams();
  const { allMovies, isLoading } = useSelector((state) => state.home);
  const user = JSON.parse(localStorage.getItem("user"));

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
        setRecommendedArray(
          allMovies.filter((movie) => movie._id !== movie_id)
        );
      }
    }
  }, [allMovies, movie_id]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  const movieBookHandler = (movieName, movie_id) => {
    navigate(`/shows/${movieName}/${movie_id}`);
  };

  const updateMovieHandler = (movie_id) => {
    navigate(`/movie/updatemovie/${movie_id}`);
  };

  return (
    <div>
      {movie ? (
        <>
          <NavBar />
          <div className="hidden md:block">
            <HomeSlider isShow={false} />
          </div>
          <div className="custom-bg-image w-full min-h-[280px] sm:min-h-[320px] md:min-h-[370px] xl:min-h-[470px] mx-auto sm:px-6 md:px-10 xl:px-12 flex items-center bg-no-repeat bg-right-top relative">
            <div className="w-full h-full mt-2 flex flex-col sm:flex-row sm:gap-8 z-50">
              <p className="sm:hidden px-5 mb-2 text-2xl font-semibold">
                {movie?.movieName}
              </p>
              <img
                src={movie?.thumbnail || ""}
                className="hidden sm:block w-[175px] md:w-[205px] xl:w-[265px] rounded-lg"
                alt={movie?.movieName || "Movie Thumbnail"}
              />
              <div className="px-4 sm:hidden">
                <img
                  src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/bhool-bhulaiyaa-3-et00353996-1728474428.jpg"
                  className="w-full rounded-md"
                  alt={movie?.movieName || "Movie Thumbnail"}
                />
              </div>

              <div className="px-6 sm:px-3 md:px-4 xl:px-7 py-4 sm:py-7 md:py-9 xl:py-12 flex flex-col gap-3 sm:gap-4 xl:gap-5">
                <p className="hidden sm:block text-lg sm:text-2xl md:text-3xl xl:text-5xl sm:text-white font-semibold">
                  {movie?.movieName}
                </p>

                <div className="flex font-medium gap-3">
                  {movie?.supportingLanguages?.map((lang, index) => (
                    <div
                      key={index}
                      className="text-sm sm:text-base py-1 xl:py-2 px-3 xl:px-4 bg-gray-300 rounded-sm"
                    >
                      <p>{lang}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap text-sm md:text-lg xl:text-xl font-medium sm:text-white">
                  <span>2h 24m</span>
                  <span className="mx-2">•</span>
                  <div>
                    {movie.genres.map((genre, index) => (
                      <span key={index}>
                        {genre}
                        {index < movie.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <span className="mx-2">•</span>
                  <span>UA</span>
                  <span className="mx-2">•</span>
                  <span>1 Nov, 2024</span>
                </div>

                {user?.accountType === "SuperAdmin" && (
                  <button
                    onClick={() => {
                      updateMovieHandler(movie_id);
                    }}
                    className="text-[18px] rounded-md text-white bg-[rgb(245,69,100)] font-medium leading-[24px] tracking-[0.2px] p-[12px_8px] whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    Update Movie
                  </button>
                )}

                {user?.accountType === "Viewer" && (
                  <button
                    onClick={() => {
                      movieBookHandler(movie.movieName, movie._id);
                    }}
                    className="w-fit text-sm sm:text-base px-4 sm:px-6 md:text-lg md:px-8 py-2 xl:text-xl xl:py-3 xl:px-10 rounded-md text-white bg-[rgb(245,69,100)] font-medium"
                  >
                    Book Tickets
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-7 sm:mt-10 px-6 md:px-10 xl:px-12 flex flex-col gap-8 sm:gap-12">
            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[28px] leading-8 font-bold">
                About the movie
              </h4>
              <p className="mt-2 sm:mt-4 tracking-[0.2px] text-sm sm:text-base">
                {movie?.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[28px] leading-8 font-bold">
                Cast
              </h4>
              <div className="mt-3 sm:mt-5 flex gap-7 sm:gap-10 overflow-x-scroll scrollbar-hide">
                {movie?.castMembers?.map((cast, index) => (
                  <div
                    key={index}
                    className="py-2 px-3 sm:px-4 flex flex-col justify-center items-center bg-gray-300 rounded-sm"
                  >
                    <p className="text-sm md:text-base font-medium whitespace-nowrap">
                      {cast}
                    </p>
                    <h5 className="text-xs md:text-sm text-gray-500 tracking-[0.2px]">
                      Actor
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl lg:text-[28px] leading-8 font-bold">
                Crew
              </h4>
              <div className="mt-3 sm:mt-5 flex gap-7 sm:gap-10 overflow-x-scroll scrollbar-hide">
                {movie?.castMembers?.map((cast, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="h-[75px] w-[75px] md:h-[100px] md:w-[100px] bg-gray-300 rounded-full">
                      <img
                        className="h-[75px] w-[75px] md:h-[100px] md:w-[100px] bg-gray-300 rounded-full"
                        src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/akshay-kumar-94-1681713982.jpg"
                        alt="cast-image"
                      />
                    </div>
                    <h5 className="text-sm md:text-base mt-2 font-medium tracking-[0.2px] whitespace-nowrap">
                      {cast}
                    </h5>
                    <h5 className="text-xs md:text-sm text-gray-500 tracking-[0.2px]">
                      Actor
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mt-3 flex justify-between items-center">
                <h4 className="text-xl sm:text-2xl lg:text-[28px] leading-8 font-bold tracking-[0.2px]">
                  You might also like
                </h4>
                <Link
                  to="/"
                  className="text-sm sm:text-lg font-medium text-[#dc354b]"
                >
                  View All
                </Link>
              </div>
              <div className="mt-5 sm:mt-7 flex gap-5 md:gap-8 overflow-x-scroll scrollbar-hide bg-[rgb(245,245,245)]">
                {recommendedArray?.slice(0, 6)?.map((recommmovie) => (
                  <MovieCard movie={recommmovie} key={recommmovie._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Movie not found</div>
      )}
    </div>
  );
};

export default MoviesPage;
