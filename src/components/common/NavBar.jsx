import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";
import { setToken } from "../../redux/reducer/homeSlice";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isLogedIn, setIsLogedIn] = useState(false);


  


  const logo = require("../../utils/png-clipart-bookmyshow-office-android-ticket-android-text-logo-removebg-preview.png")
console.log(logo)
  useEffect(() => {
    if (token) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, []);

  const logoutClickHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(""));
    setIsLogedIn(false);
  };

  return (
    <div className="w-full flex items-start justify-center py-5 px-5 md:px-7">
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] flex items-center gap-4">
          <NavLink
            to="/"
            className="flex items-center  justify-center text-[rgb(47,47,47)] text-sm sm:text-base lg:text-lg font-medium transform scale-y-150"
          >
            <h2>book</h2>
            <div className=" text-white rotate-12 inline-block">
              <div className="-rotate-12  w-max h-[30px] flex items-center justify-center">
                <h2><img src={logo} className="w-[40px] h-[20px]"></img></h2>
              </div>
            </div>
            <h2>cinema</h2>
          </NavLink>
          <div className="w-[75%] flex items-center justify-center">
            <div className="relative w-full">
              <input
                className="w-full text-xs lg:text-sm h-[30px] sm:h-[33px] lg:h-[36px] border-gray-300 border rounded-md pl-10 pr-3 outline-none font-sans"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                <GrFormSearch className="w-[30px] h-[25px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          {isLogedIn ? (
            <button
              onClick={logoutClickHandler}
              className="w-[67px] h-[25px] text-[13px] font-[500] text-center bg-[rgb(248,68,100)] text-white border-[rgb(248,68,100)] rounded-[4px] border-[1px]"
            >
              Log Out
            </button>
          ) : (
            <button className="w-[67px] h-[25px] text-[13px] font-[500] text-center bg-[rgb(248,68,100)] text-white border-[rgb(248,68,100)] rounded-[4px] border-[1px]">
              <NavLink to="/login">Sign in</NavLink>
            </button>
          )}
          <span>
            <RxHamburgerMenu className="w-[30px] h-[25px] text-[gray]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
