import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveYourShow, getUnliveShows } from "../../redux/reducer/adminSlice";

const LiveYourShow = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const result = await dispatch(getUnliveShows());
    if (getUnliveShows.fulfilled.match(result)) {
      setShows(result?.payload?.data);
    }
  };

  const handleLiveYourShow = async (showId) => {
    const result = await dispatch(liveYourShow(showId));
    if (liveYourShow.fulfilled.match(result)) {
      fetchShows();
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Live Your Show</h1>
      <div className="mt-5 grid grid-cols-4 gap-5">
        {shows.length > 0 &&
          shows.map((show) => {
            return (
              <div key={show._id} className="bg-gray-100 border rounded-md p-8">
                <div>MovieId: {show.movieId}</div>
                <div>CinemaId: {show.cinemaId}</div>
                <div>ShowStart: {show.showStart.split("T")[0]}</div>
                <div>ShowEnd: {show.showEnd.split("T")[0]}</div>
                <div>IsLive: false</div>
                <div>Timing: {show.timing}</div>
                <div>ScreenId: {show.screenId}</div>
                <button
                  onClick={() => handleLiveYourShow(show._id)}
                  disabled={isLoading}
                  className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {isLoading ? "Updating..." : "Live Show"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LiveYourShow;
