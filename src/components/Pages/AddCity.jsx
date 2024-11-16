import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../../redux/reducer/movieSlice";

const AddCity = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.movie);
  const [cityName, setCityName] = useState("");

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
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Add City</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
      >
        <div>
          <label
            htmlFor="cityName"
            className="block text-sm font-medium text-gray-700"
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
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Adding..." : "Add City"}
        </button>
      </form>
    </div>
  );
};

export default AddCity;
