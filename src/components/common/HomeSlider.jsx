import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import sliderPictureArray from "../../utils/sliderPicture";

console.log("hello");
const HomeSlider = () => {
  const [dummy,setdummy]=useState([]);
  const [index, setIndex] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-max-h flex flex-col items-center justify-center bg-[rgb(245,245,245)]">
      <div className="bg-[rgb(245,245,245)] flex items-center justify-between w-[90%] px-0 py-3">
        <div className="flex items-center justify-center gap-3">
          <ul className="flex items-center justify-center gap-5 text-[14px] font-sans font-[450] text-[rgb(51,51,51)]">
            <li>
              <NavLink>Movies</NavLink>
            </li>
            <li>
              <NavLink>Streams</NavLink>
            </li>
            <li>
              <NavLink>Events</NavLink>
            </li>
            <li>
              <NavLink>Plays</NavLink>
            </li>
            <li>
              <NavLink>Sports</NavLink>
            </li>
            <li>
              <NavLink>Activities</NavLink>
            </li>
          </ul>
        </div>

        {user?.accountType === "Viewer" && (
          <div className="flex items-center justify-center">
            <ul className="flex items-center justify-center gap-5 text-[14px] font-sans font-[450] text-[rgb(51,51,51)]">
              <li>
                <NavLink>ListYourShow</NavLink>
              </li>
              <li>
                <NavLink>Corporates</NavLink>
              </li>
              <li>
                <NavLink>Offers</NavLink>
              </li>
              <li>
                <NavLink>Gift Cards</NavLink>
              </li>
            </ul>
          </div>
        )}
        {user?.accountType === "Admin" && (
          <div className="flex items-center justify-center">
            <ul className="flex items-center justify-center gap-5 text-[14px] font-sans font-[450] text-[rgb(51,51,51)]">
              <li>
                <NavLink to="/cinema/addCinema">Add Cinema</NavLink>
              </li>
              <li>
                <NavLink to="/cinema/updateScreen">Update Screen</NavLink>
              </li>
              <li>
                <NavLink to="/show/addShow">Add Show</NavLink>
              </li>
              <li>
                <NavLink to="/show/liveYourShow">Live Show</NavLink>
              </li>
            </ul>
          </div>
        )}


        {user?.accountType === "SuperAdmin" && (
          <div className="flex items-center justify-center">
            <ul className="flex items-center justify-center gap-5 text-[14px] font-sans font-[450] text-[rgb(51,51,51)]">
              <li>
                <NavLink to="/movie/addMovie">Add Movie</NavLink>
              </li>
              <li>
                <NavLink to="/addCity">Add City</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="bg-[rgb(235,235,235)] w-full h-[320px] flex items-center justify-center">
        {
          <img
            src={sliderPictureArray[index].img}
            className="w-[90%] h-[300px] object-cover"
          ></img>
        }
      </div>
    </div>
  );
};

export default HomeSlider;
