import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShowDetailes } from "../../redux/reducer/showSlice";
import NavBar from "../common/NavBar";

const CinemasShowPage = () => {
  const dispatch = useDispatch();
  const { cinemas, movieDetailes, loading } = useSelector(
    (state) => state.show
  );

  const { movie_id } = useParams();
  useEffect(() => {
    const fetchShowsDetailesData = async (movie_id) => {
      const result = await dispatch(fetchShowDetailes({ movieId: movie_id }));

      if (fetchShowDetailes.fulfilled.match(result)) {
        console.log("Fetch successful");
      } else {
        console.error("Fetch failed");
      }
    };

    fetchShowsDetailesData(movie_id);
  }, [dispatch, movie_id]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div>
      <NavBar></NavBar>
      <div>Cinemas Araay</div>
    </div>
  );
};

export default CinemasShowPage;
