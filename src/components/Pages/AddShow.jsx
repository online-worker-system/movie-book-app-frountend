import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addShow, getAdminCinemas } from "../../redux/reducer/adminSlice";

const AddShow = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admin);
  const initialState = {
    // movieId: "6735fe572e8a00b13d84dd71",
    movieId: "6735c314a4fd81581f50c7e9",
    cinemaId: "",
    screenId: "",
    showStart: "",
    showEnd: "",
    timing: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [cinemas, setCinemas] = useState([]);
  const [screens, setScreens] = useState([]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Check if showEnd is earlier than showStart
    if (new Date(formData.showEnd) < new Date(formData.showStart)) {
      toast.error("End date cannot be earlier than the start date.");
      return;
    }

    const result = await dispatch(addShow(formData));
    if (addShow.fulfilled.match(result)) {
      setFormData(initialState);
    }
  };

  useEffect(() => {
    const fetchAdminCinemas = async () => {
      const result = await dispatch(getAdminCinemas());
      if (getAdminCinemas.fulfilled.match(result)) {
        setCinemas(result.payload.data);
      }
    };
    fetchAdminCinemas();
  }, []);

  useEffect(() => {
    const tempScreens = cinemas.find(
      (temp) => temp._id === formData.cinemaId
    )?.screens;
    setScreens(tempScreens);
  }, [formData.cinemaId]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="custom-loader text-center"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Add Show</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
      >
        <div>
          <label
            htmlFor="cinema"
            className="block text-sm font-medium text-gray-700"
          >
            Cinema
          </label>
          <select
            onChange={handleOnChange}
            name="cinemaId"
            id="cinemaId"
            value={formData.cinemaId}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Cinema</option>
            {cinemas.map((cinema) => {
              return (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.cinemaName}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="screen"
            className="block text-sm font-medium text-gray-700"
          >
            Screen
          </label>
          <select
            onChange={handleOnChange}
            name="screenId"
            id="screenId"
            value={formData.screenId}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Screen</option>
            {screens?.map((screen, index) => {
              return (
                <option key={screen} value={screen}>
                  {`Screen-${index + 1}`}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="timing"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <select
            onChange={handleOnChange}
            name="timing"
            id="timing"
            value={formData.timing}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Time</option>
            <option value="9-12am">9am to 12am</option>
            <option value="3-6pm">3pm to 6pm</option>
            <option value="9-12pm">9pm to 12pm</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="showStart"
            className="block text-sm font-medium text-gray-700"
          >
            Show Start
          </label>
          <input
            type="date"
            id="showStart"
            name="showStart"
            value={formData.showStart}
            onChange={handleOnChange}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="showEnd"
            className="block text-sm font-medium text-gray-700"
          >
            Show End
          </label>
          <input
            type="date"
            id="showEnd"
            name="showEnd"
            value={formData.showEnd}
            onChange={handleOnChange}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Adding..." : "Add Show"}
        </button>
      </form>
    </div>
  );
};

export default AddShow;
