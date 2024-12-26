import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";
import { setToken } from "../../redux/reducer/homeSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isMobile2 = useMediaQuery({ query: "(max-width: 400px)" });

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
    navigate("/");
  };

  return (
    <div className="w-full flex items-start justify-center py-5 px-3 sm:px-5 md:px-7">
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-1 justify-center text-[rgb(47,47,47)] text-xs sm:text-base lg:text-lg font-medium transform scale-y-150"
          >
            <h2>book</h2>
            <div className="-ml-[42px] -mr-[48px]">
              <svg
                viewBox="0 0 115 33"
                fill="none"
                className="w-[108px] h-[23px] sm:w-[112px] sm:h-[26px] lg:w-[115px] lg:h-[30px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6398_17562)">
                  <path
                    d="M72.4622 9.6674L70.5729 6.44009L67.1867 8.05374L65.2974 4.82643L61.9112 6.44009L60.0219 3.21278L56.6357 4.82643L54.7464 1.59912L51.3602 3.21278L49.4709 0L46.0847 1.61366L38.9199 24.9317L47.6252 27.5921C48.2065 25.7167 49.965 24.3357 52.0287 24.3357C54.572 24.3357 56.6357 26.4 56.6357 28.9441C56.6357 28.9731 56.6357 29.0022 56.6357 29.0313C56.6502 29.4529 56.6066 29.8744 56.4758 30.2815L65.3265 32.9855L72.4622 9.6674Z"
                    fill="#D71920"
                  ></path>
                  <path
                    d="M46.3747 22.9982C45.9242 22.9109 45.6045 22.533 45.6045 22.0678V10.6559C45.6045 10.118 46.026 9.71094 46.5491 9.71094H54.7894C55.0074 9.71094 55.2254 9.72547 55.4288 9.76909C57.2019 10.0889 58.4953 11.6153 58.4953 13.418V22.0823C58.4953 22.344 58.3936 22.5766 58.2047 22.7656C58.0303 22.94 57.7832 23.0418 57.5361 23.0418C57.478 23.0418 57.4199 23.0418 57.3617 23.0272C56.9112 22.94 56.5915 22.562 56.5915 22.0968V13.4034C56.5915 12.5312 55.9666 11.7898 55.0946 11.6299C54.9928 11.6153 54.8911 11.6008 54.7894 11.6008H52.9873V22.0678C52.9873 22.3294 52.8856 22.562 52.6966 22.751C52.5222 22.9255 52.2752 23.0272 52.0281 23.0272C51.97 23.0272 51.9118 23.0272 51.8537 23.0127C51.4032 22.9255 51.0835 22.5475 51.0835 22.0823V11.6153H47.4793V22.0823C47.4793 22.344 47.3775 22.5766 47.1886 22.7656C47.0142 22.94 46.7671 23.0418 46.5201 23.0418C46.491 23.0127 46.4329 23.0127 46.3747 22.9982Z"
                    fill="white"
                  ></path>
                  <path
                    d="M60.0945 27.9846C59.6439 27.912 59.3242 27.5194 59.3242 27.0542C59.3242 26.7926 59.4259 26.56 59.6003 26.3855C59.7747 26.2111 60.0218 26.1093 60.2834 26.1093C61.0827 26.1093 61.7803 25.586 62.0128 24.83L62.9865 21.5591L59.7747 10.845C59.6149 10.3362 59.9055 9.7983 60.4142 9.65292C60.5595 9.60931 60.6903 9.60931 60.8357 9.63839C61.1844 9.69654 61.4751 9.94367 61.5914 10.278L63.9748 18.2736L66.3873 10.278C66.5035 9.82737 66.9831 9.53662 67.4918 9.62385L67.5645 9.63839C68.0731 9.7983 68.3638 10.3362 68.2039 10.845L64.9049 21.8498L63.8585 25.3679C63.5969 26.182 63.1319 26.8362 62.5215 27.2723C61.8675 27.752 61.0972 28.0137 60.2979 28.0137C60.2107 27.9992 60.1526 27.9846 60.0945 27.9846Z"
                    fill="white"
                  ></path>
                </g>
              </svg>
            </div>
            <h2>cinema</h2>
          </NavLink>
          <div className="w-[75%] flex items-center justify-center">
            <div className="relative w-full">
              {!isMobile && (
                <input
                  className="w-full text-xs lg:text-sm h-[30px] sm:h-[33px] lg:h-[36px] border-gray-300 border rounded-md pl-10 pr-3 outline-none font-sans"
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                />
              )}
              {isMobile && (
                <input
                  style={{
                    width: isMobile2 ? "30px" : "120px",
                  }}
                  className="text-xs lg:text-sm h-[30px] sm:h-[33px] lg:h-[36px] border-gray-300 border rounded-md pl-8 outline-none font-sans"
                  placeholder="Search"
                />
              )}
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                <GrFormSearch className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {isLogedIn ? (
            <button
              onClick={logoutClickHandler}
              className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border"
            >
              Log Out
            </button>
          ) : (
            <button className="px-3 sm:px-4 py-1 text-[11px] sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border">
              <NavLink to="/login">Sign in</NavLink>
            </button>
          )}
          <span>
            <RxHamburgerMenu className="text-[22px] sm:text-[26px] cursor-pointer text-[gray]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
