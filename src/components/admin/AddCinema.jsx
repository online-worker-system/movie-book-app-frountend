import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCinema } from "../../redux/reducer/adminSlice";

const AddCinema = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cinemaName: "",
    pincode: "",
    cityId: "",
  });

  const cities = [
    {
      cityId: "672c6d02cbfa80af4d4f1e61",
      cityName: "Indore",
    },
    {
      cityId: "672c6d11cbfa80af4d4f1e65",
      cityName: "Mhow",
    },
    {
      cityId: "672c6d1ccbfa80af4d4f1e68",
      cityName: "Pithampur",
    },
    {
      cityId: "67305e750b7d8df480b0bf96",
      cityName: "Bhopal",
    },
  ];

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Form: ", formData);

    const result = await dispatch(addCinema(formData));
    console.log("addCinema res: ", result);

    if (addCinema.fulfilled.match(result)) {
      console.log("Add Cinema Success");
    }
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1>Add Cinema</h1>
      <form onSubmit={handleOnSubmit} className="mt-7 bg-gray-300 p-10">
        <label className="w-full">
          <p className="mb-1 leading-[1.375rem] text-richblack-5">
            Cinema Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="cinemaName"
            value={formData.cinemaName}
            onChange={handleOnChange}
            placeholder="Enter cinema name"
            className="w-full"
          />
        </label>
        <label className="w-full">
          <p className="mt-3 mb-1 leading-[1.375rem] text-richblack-5">
            Pincode <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleOnChange}
            placeholder="Enter pincode"
            className="w-full"
          />
        </label>
        <select
          onChange={handleOnChange}
          name="cityId"
          id="cityId"
          className="w-full mt-5 mb-1 leading-[1.375rem] text-richblack-5"
        >
          <option value="">Select One</option>
          {cities.map((city) => {
            return <option value={city.cityId}>{city.cityName}</option>;
          })}
        </select>
        <button
          type="submit"
          className="w-full mt-7 rounded-lg bg-yellow-50 py-2 font-medium"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCinema;
