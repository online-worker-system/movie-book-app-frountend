import React, { useEffect } from "react";
import NavBar from "./common/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesApi } from "../redux/reducer/homeSlice"; 

const Home = () => {
  const dispatch = useDispatch();
  const { allMovies } = useSelector((state) => state.home);

  useEffect(() => {
    // Separate async function to handle API call
    const fetchMovies = async () => {
      const resultAction = await dispatch(getAllMoviesApi());
      
      if (getAllMoviesApi.fulfilled.match(resultAction)) {
       
      } else {
        console.log("Data not fetched", resultAction.payload || resultAction.error);
      }
    };
    
    fetchMovies(); // Call the async function
  }, [dispatch]);

  

  console.log("All movies fetched",allMovies);
  return (
    <div>
      <NavBar />
      <div>
        {allMovies.length ? (
          allMovies.map((movie) => <div key={movie._id}>{movie.title}</div>)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
