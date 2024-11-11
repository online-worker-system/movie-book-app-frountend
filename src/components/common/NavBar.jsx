import React from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
const NavBar = () => {
  return (
    <div className="w-full max-h-max bg-white flex items-center justify-center p-5">
     <div className="w-[95%] max-h-max flex items-center justify-between">
     <div className=" w-[60%] flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-1 text-black font-sans font-[400] text-[15px] transform scale-y-150">
          <h2>book</h2>
          <div className="bg-red-500 text-white rotate-12 inline-block">
            <div className="-rotate-12 inline-block">
              <h2>my</h2>
            </div>
          </div>

          <h2>cinema</h2>
        </div>
        <div className="w-[75%] flex items-center justify-center">
          <input className="w-[100%] h-[34px] border-[rgb(238,238,238)] border-[1px] rounded-[4px] pl-3 outline-none font-sans" placeholder="Search for Movies,Events,Plays,Sports ans Activities"></input>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <NavLink to="/login">Login</NavLink>
        <span>
          <RxHamburgerMenu />
        </span>
      </div>
     </div>
    </div>
  );
};

export default NavBar;
