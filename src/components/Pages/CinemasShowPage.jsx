import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowDetailes } from "../../redux/reducer/showSlice";
import NavBar from "../common/NavBar";

const CinemasShowPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cinemas, movieDetailes, loading } = useSelector(
    (state) => state.show
  );

  const { movie_id } = useParams();
  useEffect(() => {
    const fetchShowsDetailesData = async (movie_id) => {
      const result = await dispatch(fetchShowDetailes({ movieId: movie_id }));

      // if (fetchShowDetailes.fulfilled.match(result)) {
      //   console.log("Fetch successful");
      // } else {
      //   console.error("Fetch failed");
      // }
    };

    fetchShowsDetailesData(movie_id);
  }, [dispatch, movie_id]);

  const formatTime = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12; // Converts 0 to 12 for midnight
    hours = String(hours).padStart(2, "0"); // Ensure 2-digit format

    return `${hours}:${minutes} ${amPm}`;
  };

  const showClickHandler = (movie_id, cinema_id, timing) => {
    navigate(`/buytickets/${movie_id}/${cinema_id}/${timing}/seats`);
  };

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
      <div>
        <p>
          {movieDetailes?.movieName}
          <span>{movieDetailes?.supportingLanguage} </span>
        </p>

        <div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {movieDetailes.genres &&
              movieDetailes.genres.length > 0 &&
              movieDetailes.genres.map((genre, index) => (
                <button
                  key={index}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  {genre}
                </button>
              ))}
          </div>
        </div>

        <div>
          <h2>Cinema Show Times</h2>
          {cinemas.map((cinema) => (
            <div
              key={cinema.cinemaId}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ color: "#333" }}>{cinema.cinemaName}</h3>
              <p>
                <strong>City:</strong> {cinema.city}
              </p>
              <p>
                <strong>Pincode:</strong> {cinema.pincode}
              </p>
              <p>
                <strong>Show Timing:</strong>{" "}
                <button
                  className="border-[1px] border-[#999] p-[4px] text-[#4abd5d] h-[40px] w-[100px] text-center rounded-[4px]"
                  onClick={() => {
                    showClickHandler(movie_id, cinema.cinemaId, cinema.timing);
                  }}
                >
                  {formatTime(cinema.showStart)}
                </button>
              </p>
              <p>
                <strong>Show Dates:</strong>{" "}
                {new Date(cinema.showStart).toLocaleDateString()} -{" "}
                {new Date(cinema.showEnd).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemasShowPage;
