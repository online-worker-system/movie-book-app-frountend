import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import sliderPictureArray from "../../utils/sliderPicture";

const HomeSlider = ({ isShow = true }) => {
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
    <div className="w-full flex flex-col items-center justify-center bg-[rgb(245,245,245)]">
      <div className="w-full py-3 px-5 md:px-7 flex flex-wrap gap-2 items-center justify-between bg-[rgb(245,245,245)]">
        <div>
          <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
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
          <div>
            <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
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
          <div>
            <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
              <li>
                <NavLink to="/cinema/addCinema">Add Cinema</NavLink>
              </li>
              <li>
                <NavLink to="/cinema/adminCinemas">Update Screen</NavLink>
              </li>
              <li>
                <NavLink to="/show/liveYourShow">Live Show</NavLink>
              </li>
            </ul>
          </div>
        )}

        {user?.accountType === "SuperAdmin" && (
          <div>
            <ul className="text-[11px] sm:text-xs lg:text-sm flex flex-wrap gap-3 lg:gap-5 text-[rgb(51,51,51)]">
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
      {isShow && (
        <div className="w-full home-banner-height sm:!h-full p-2 sm:px-3 sm:py-3 md:px-5 md:py-4 bg-[rgb(235,235,235)]">
          <img
            src={sliderPictureArray[index].img}
            className="w-full h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
