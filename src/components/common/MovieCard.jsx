import React from "react";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const movieClickHandler = (movieName, movieId) => {
    navigate(`/movies/${movieName}/${movieId}`);
  };

  return (
    <div>
      <div
        key={movie._id}
        onClick={() => {
          movieClickHandler(movie.movieName, movie._id);
        }}
      >
        <div className="w-[220px] h-[370px]">
          <img
            src={movie.thumbnail}
            alt="#"
            className="w-[100%] h-[100%] object-cover rounded-lg"
          ></img>
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-[20px] font-[500]">{movie.movieName}</span>
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
    </div>
  );
};

export default MovieCard;
