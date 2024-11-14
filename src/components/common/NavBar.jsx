import React from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";

const NavBar = () => {
  return (
    <div className="w-full min-h-[50px] bg-white flex items-start justify-center mt-4">
      <div className="w-[90%] max-h-max flex items-center justify-between">
        <div className=" w-[60%] flex items-center justify-start gap-4">
          <div className="flex items-center gap-1 justify-center text-[rgb(47,47,47)] font-sans font-[500] text-[16px] transform scale-y-150">
            <h2>book</h2>
            <div className="bg-red-500 text-white rotate-12 inline-block">
              <div className="-rotate-12  w-[25px] h-[20px] flex items-center justify-center">
                <h2>my</h2>
              </div>
            </div>

            <h2>cinema</h2>
          </div>
          <div className="w-[75%] flex items-center justify-center">
            <div className="relative w-full">
              <input
                className="w-full h-[35px] text-[14px] font-[400] border-[rgb(238,238,238)] border-[1px] rounded-[4px] pl-10 pr-3 outline-none font-sans"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
                <GrFormSearch className="w-[30px] h-[25px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <button className="w-[67px] h-[25px] text-[13px] font-[500] text-center bg-[rgb(248,68,100)] text-white border-[rgb(248,68,100)] rounded-[4px] border-[1px]">
            <NavLink to="/login">Sign in</NavLink>
          </button>
          <span>
            <RxHamburgerMenu className="w-[30px] h-[25px] text-[gray]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
