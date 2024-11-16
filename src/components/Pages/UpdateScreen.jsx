import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScreen } from "../../redux/reducer/adminSlice";

const UpdateScreen = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
  const initialState = {
    regular: {
      name: "REGULAR",
      seat: "",
      price: "",
    },
    bolcony: {
      name: "BALCONY",
      seat: "",
      price: "",
    },
    vip: {
      name: "VIP",
      seat: "",
      price: "",
    },
    screenId: "673769dd0fcd6f4ce3954fee",
  };
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e, category, field) => {
    const value = e.target.value;
    // Allow empty value or ensure the value is greater than 0
    if (value === "" || parseInt(value) > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [field]: value,
        },
      }));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateScreen(formData));
    if (updateScreen.fulfilled.match(result)) {
      setFormData(initialState);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Update Screen</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 min-w-96 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
      >
        {Object.keys(formData)
          .filter((category) => category !== "screenId")
          .map((category) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-medium capitalize">
                {formData[category].name}
              </h2>
              <div className="flex flex-col">
                <label
                  htmlFor={`${category}-seat`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Seats
                </label>
                <input
                  type="number"
                  id={`${category}-seat`}
                  value={formData[category].seat}
                  onChange={(e) => handleOnChange(e, category, "seat")}
                  placeholder={`Enter number of seats for ${formData[category].name}`}
                  required
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor={`${category}-price`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id={`${category}-price`}
                  value={formData[category].price}
                  onChange={(e) => handleOnChange(e, category, "price")}
                  placeholder={`Enter price for ${formData[category].name}`}
                  required
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
          ))}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Updating..." : "Update Screen"}
        </button>
      </form>
    </div>
  );
};

export default UpdateScreen;
