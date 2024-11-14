import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCinema } from "../../redux/reducer/adminSlice";

const AddCinema = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
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
      <h1 className="text-2xl font-medium">Add Cinema</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-3 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
      >
        <div>
          <label
            htmlFor="cinemaName"
            className="block text-sm font-medium text-gray-700"
          >
            Cinema Name
          </label>
          <input
            type="text"
            id="cinemaName"
            name="cinemaName"
            value={formData.cinemaName}
            onChange={handleOnChange}
            placeholder="Enter cinema name"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleOnChange}
            placeholder="Enter pincode"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            onChange={handleOnChange}
            name="cityId"
            id="cityId"
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => {
              return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>;
            })}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Adding..." : "Add Cinema"}
        </button>
      </form>
    </div>
  );
};

export default AddCinema;
