import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { sendOtpApi, setSignupData } from "../../redux/reducer/authSlice";
import { Link } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    accountType: "Viewer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    userName,
    email,
    contactNumber,
    password,
    confirmPassword,
    accountType,
  } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePhoneNumber(contactNumber)) {
      toast.error("Please enter a valid contact number");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    dispatch(setSignupData(formData));
    const result = await dispatch(sendOtpApi(formData.email));
    if (sendOtpApi.fulfilled.match(result)) {
      navigate("/otp");
    }
  };

  return (
    <div className="mt-7 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">SignUp</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg flex flex-col gap-y-4"
      >
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleOnChange}
            placeholder="Enter user name"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={handleOnChange}
            placeholder="Enter contact number"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Create Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter password"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[35px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Enter confirm password"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[35px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Creating..." : "Create Account"}
        </button>

        <div className="mt-3 flex justify-center text-sm text-richblack-500 gap-1">
          <span>Already have an account ?</span>
          <Link to="/login" className="hover:underline text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
