// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchShowDetailes } from "../../redux/reducer/showSlice";
// import NavBar from "../common/NavBar";

// const CinemasShowPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { movie_id } = useParams();
//   const { cinemas, movieDetailes, loading } = useSelector(
//     (state) => state.show
//   );

//   useEffect(() => {
//     const fetchShowsDetailesData = async (movie_id) => {
//       const result = await dispatch(fetchShowDetailes({ movieId: movie_id }));

//       // if (fetchShowDetailes.fulfilled.match(result)) {
//       //   console.log("Fetch successful");
//       // } else {
//       //   console.error("Fetch failed");
//       // }
//     };

//     fetchShowsDetailesData(movie_id);
//   }, [dispatch, movie_id]);

//   const formatTime = (isoTimestamp) => {
//     const date = new Date(isoTimestamp);
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const amPm = hours >= 12 ? "PM" : "AM";

//     // Convert 24-hour format to 12-hour format
//     hours = hours % 12 || 12; // Converts 0 to 12 for midnight
//     hours = String(hours).padStart(2, "0"); // Ensure 2-digit format

//     return `${hours}:${minutes} ${amPm}`;
//   };

//   const showClickHandler = (movie_id, cinema_id, timing) => {
//     navigate(`/buytickets/${movie_id}/${cinema_id}/${timing}/seats`);
//   };

//   if (loading) {
//     return (
//       <div className="w-screen h-screen flex items-center justify-center">
//         <div className="custom-loader text-center"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <NavBar></NavBar>
//       <div className="p-10">
//         <p>
//           {movieDetailes?.movieName}
//           <span> ({movieDetailes?.supportingLanguages?.join(", ")})</span>
//         </p>

//         <div>
//           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//             {movieDetailes.genres &&
//               movieDetailes.genres.length > 0 &&
//               movieDetailes.genres.map((genre, index) => (
//                 <button
//                   key={index}
//                   style={{
//                     padding: "10px 15px",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                     backgroundColor: "#f0f0f0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {genre}
//                 </button>
//               ))}
//           </div>
//         </div>

//         <div>
//           <h2>Cinema Show Times</h2>
//           {cinemas.map((cinema) => (
//             <div
//               key={cinema.cinemaId}
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//                 padding: "16px",
//                 marginBottom: "20px",
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <p>
//                 <span className="font-bold">Cinema:</span> {cinema.cinemaName}
//               </p>
//               <p className="capitalize">
//                 <span className="font-bold">City:</span> {cinema.city}
//               </p>
//               <p>
//                 <span className="font-bold">Pincode:</span> {cinema.pincode}
//               </p>
//               <p>
//                 <span className="font-bold">Show Timing: </span>
//                 <button
//                   className="border border-[#999] px-3 py-1 text-[#4abd5d] text-center rounded-md"
//                   onClick={() => {
//                     showClickHandler(movie_id, cinema.cinemaId, cinema.timing);
//                   }}
//                 >
//                   {formatTime(cinema.showStart)}
//                 </button>
//               </p>
//               <p>
//                 <span className="font-bold">Show Dates: </span>
//                 {`${new Date(
//                   cinema.showStart
//                 ).toLocaleDateString()} - ${new Date(
//                   cinema.showEnd
//                 ).toLocaleDateString()}`}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CinemasShowPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowDetailes } from "../../redux/reducer/showSlice";
import NavBar from "../common/NavBar";

const CinemasShowPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { cinemas, movieDetailes, loading } = useSelector(
    (state) => state.show
  );

  useEffect(() => {
    const fetchShowsDetailesData = async (movie_id) => {
      await dispatch(fetchShowDetailes({ movieId: movie_id }));
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

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the dark mode state
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-900 text-white transition-all duration-500 ease-in-out"
          : "bg-white text-black transition-all duration-500 ease-in-out"
      }
    >
      <NavBar />

      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full focus:outline-none transition-all duration-300 ease-in-out transform ${
            isDarkMode
              ? "bg-red-600 hover:bg-red-800"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <span
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {isDarkMode ? "Switch" : "Switch"}
          </span>
        </button>
      </div>

      <div className="wholepage h-full w-full flex justify-center px-4 sm:px-6 md:px-8">
        {/* Main Box */}
        <div className="mainbox drop-shadow-2xl my-5 rounded-2xl border-x-2 border-y-2 w-full max-w-md sm:max-w-lg md:max-w-xl -mt-10 px-4 py-5">
          <div className="heading mt-3 flex text-xl font-extrabold rounded-lg shadow-md justify-center">
            <h1 className="text-lg sm:text-xl mb-1 md:text-2xl lg:text-3xl">
              Choose Date And Time
            </h1>
          </div>

          {/* Movie Image */}
          <div className="movie-image flex justify-center rounded-md mt-6">
            {movieDetailes?.thumbnail ? (
              <img
                src={movieDetailes.thumbnail}
                alt={movieDetailes.movieName}
                className="w-36 h-60 rounded-lg sm:w-48 md:w-64"
              />
            ) : (
              <div>No Image Available</div>
            )}
          </div>

          <div className="movie-details font-normal mt-6">
            <div className="moviename flex font-extrabold drop-shadow-2xl text-3xl justify-center sm:text-2xl md:text-3xl">
              <h1 className="ml-2">
                {movieDetailes?.movieName || "Movie Name Not Available"}
              </h1>
            </div>
            <div className="genres flex gap-3 font-extrabold mt-4 justify-center flex-wrap">
              {movieDetailes.genres &&
                movieDetailes.genres.length > 0 &&
                movieDetailes.genres.map((genre, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 text-white bg-red-500 rounded-full font-semibold"
                  >
                    {genre}
                  </button>
                ))}
            </div>

            {/* Cinema Details */}
            <div className="cinemadetails mt-4">
              <div
                className={`flex justify-center font-extrabold ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <h2 className="text-xl">Cinema Show Times</h2>
              </div>
              {cinemas.map((cinema) => (
                <div
                  key={cinema.cinemaId}
                  className="border border-gray-300 rounded-lg mt-4 p-4 mb-5 shadow-md"
                >
                  <p>
                    <span className="font-bold">Cinema:</span>{" "}
                    {cinema.cinemaName}
                  </p>
                  <p className="capitalize">
                    <span className="font-bold">City:</span> {cinema.city}
                  </p>
                  <p>
                    <span className="font-bold">Pincode:</span> {cinema.pincode}
                  </p>
                  <p>
                    <span className="font-bold">Show Timing:</span>
                    <div className="border border-[#999] px-3 py-1 text-[#4abd5d] text-center rounded-md">
                      {formatTime(cinema.showStart)}
                    </div>
                  </p>
                  <p>
                    <span className="font-bold">Show Dates: </span>
                    {`${new Date(
                      cinema.showStart
                    ).toLocaleDateString()} - ${new Date(
                      cinema.showEnd
                    ).toLocaleDateString()}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* "Click Here" */}
          <div className="flex justify-center items-center mt-6 space-y-4">
            {cinemas.map((cinema) => (
              <button
                key={cinema.cinemaId}
                onClick={() =>
                  showClickHandler(movie_id, cinema.cinemaId, cinema.timing)
                }
                className="text-normal font-normal text-white mb-4 shadow-2xl rounded-3xl bg-red-500 w-40 h-12 sm:w-48 md:w-56 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Click Here
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemasShowPage;
