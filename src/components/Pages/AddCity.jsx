import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { addCity } from "../../redux/reducer/movieSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const AddCity = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.movie);
  const [cityName, setCityName] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  const handleOnChange = (e) => {
    setCityName(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addCity(cityName));
    if (addCity.fulfilled.match(result)) {
      setCityName("");
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Add City
        </h1>
        <form
          onSubmit={handleOnSubmit}
          style={{
            width: isMobile ? "85%" : "0%",
            minWidth: isMobile ? "0px" : "350px"
          }}
          className="mx-auto mt-5 lg:mt-8 p-8 bg-gray-200 shadow-lg rounded-lg space-y-8"
        >
          <div>
            <label
              htmlFor="cityName"
              className="block text-sm md:text-base lg:text-lg text-gray-700 font-medium"
            >
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={cityName}
              onChange={handleOnChange}
              placeholder="Enter city name"
              required
              className="w-full mt-2 p-2 text-xs md:text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-[6px] lg:py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
          >
            {loading ? "Adding..." : "Add City"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
