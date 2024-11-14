import { all } from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../common/NavBar";
import MovieCard from "../common/MovieCard";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
const MoviesPage = () => {
  const { movie_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // Separate async function to handle API call
    const fetchMovies = async () => {
      const resultAction = await dispatch(getAllMoviesApi());

      if (getAllMoviesApi.fulfilled.match(resultAction)) {
        console.log("heko");
      } else {
        console.log(
          "Data not fetched",
          resultAction.payload || resultAction.error
        );
      }
    };

    fetchMovies(); // Call the async function
  }, []);

  console.log(movie_id);

  const { allMovies } = useSelector((state) => state.home);
  console.log(allMovies);
  const recommendedArray = allMovies.filter((movie) => movie._id !== movie_id);
  const Movie = allMovies.filter((movie) => movie._id === movie_id);
  console.log(Movie[0]);
  console.log(recommendedArray);
  return (
    <div>
      <NavBar></NavBar>

      {Movie[0] ? (
        <div className="relative w-screen h-[500px] flex justify-center items-center">
          <div className="w-full h-full absolute z-0">
            {/* Left Gradient Overlay */}
            <div className="absolute left-0 w-[60%] h-full bg-gradient-to-r from-black to-[rgb(102,102,102)]"></div>

            {/* Center Image Section */}
            <div
              className="w-[40%] h-full bg-cover bg-center bg-no-repeat absolute right-20 z-10"
              style={{ backgroundImage: `url(${Movie[0].thumbnail})` }}
            ></div>

            {/* Right Gradient Overlay */}
            <div className="absolute right-0 w-[10%] h-full bg-gradient-to-l from-black to-[rgb(102,102,102)] z-20"></div>
          </div>

          <div className="w-[70%] h-full flex absolute left-10 z-50">
            <div className="flex w-full h-full items-center justify-start p-2 gap-8">
              <img
                src={Movie[0].thumbnail}
                className="w-[250px] h-[80%] rounded-lg"
              ></img>

              <div className="flex flex-col h-[80%] p-2">
                <p className="text-[40px] text-white font-sans font-[600] uppercase">
                  {Movie[0].movieName}
                </p>
                {
                  <div className="flex bg-white text-black font-[400] text-[15px] p-1 gap-3">
                    {Movie[0].supportingLanguages.map((lang, index) => (
                      <div key={index} className="inline-flex">
                        <p>{lang}</p>
                        {index !== Movie[0].supportingLanguages.length - 1 && (
                          <p>,&nbsp;</p>
                        )}
                      </div>
                    ))}
                  </div>
                }

                {
                  <div className="flex text-white font-[400] text-[20px] p-1">
                    {Movie[0].genres.map((genre) => (
                      <p>{`${genre},`}</p>
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
      ) : (
        <div className="text-center">Loading</div>
      )}

      {
        <div className="flex items-center justify-center gap-8 flex-wrap py-8 bg-[rgb(245,245,245)]">
          {recommendedArray.map((movie) => (
            <MovieCard movie={movie} key={movie._id}></MovieCard>
          ))}
        </div>
      }
    </div>
  );
};

export default MoviesPage;
