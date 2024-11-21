import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginApi } from "../../redux/reducer/authSlice";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // Clear error for the field being edited
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await dispatch(loginApi(formData));
    if (loginApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen ">
      <div className="w-[30%] h-[85%] bg-white flex flex-col items-center justify-center gap-1 p-2 rounded-lg shadow-xl transform scale-105">
        <div className="w-full flex flex-col items-center justify-center">
          <span className="text-[rgb(51,51,51)] text-[16px] font-[500] leading-[24px]">
            Hi, Welcome Back
          </span>
          <span className="text-[rgb(51,51,51)] text-[16px] font-[500] leading-[24px]">
            Please Enter Your Details to Sign In
          </span>
        </div>
        <div className="w-full my-3 flex items-center justify-around py-3">
          <button className="w-[120px] h-[50px] flex items-center justify-center text-[25px] border rounded-lg hover:scale-105 transition duration-200 ease-in-out">
            <SiApple />
          </button>
          <button className="w-[120px] h-[50px] flex items-center justify-center text-[25px] border rounded-lg hover:scale-105 transition duration-200 ease-in-out">
            <FcGoogle />
          </button>
          <button className="w-[120px] h-[50px] flex items-center justify-center text-[25px] border rounded-lg hover:scale-105 transition duration-200 ease-in-out">
            <FaTwitter className="text-[rgb(26,156,244)]" />
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-4">
          <div className="w-[40%] border "></div>
          <p className="text-[rgb(102,102,102)] text-[14px] font-[500] font-sans leading-[24px]">
            OR
          </p>
          <div className="w-[40%] border "></div>
        </div>

        <form
          onSubmit={handleOnSubmit}
          className="w-full mx-auto p-8 rounded-lg  flex flex-col items-center justify-center  gap-2"
        >
          <div className="w-full">
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
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className={`mt-2 bg-none block w-full text-sm text-[rgb(102,102,102)] border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="relative w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter password"
              className={`mt-2 bg-transparent block w-full text-sm text-[rgb(102,102,102)] border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 outline-none`}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="w-full flex items-center justify-between">
            <label
              htmlFor="remeber"
              className="flex items-center justify-center gap-1 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <input type="checkbox" id="remeber" name="remeber"></input>
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="hover:underline flex text-sm items-center justify-center text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="w-full">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-5 bg-[rgb(248,68,100)] text-white py-2 font-medium text-[14px] rounded-lg cursor-pointer "
            >
              {isLoading ? "Signing..." : "Continue"}
            </button>
          </div>
        </form>

        <div className="mb-2 flex items-center justify-center text-sm text-richblack-500 gap-1">
          <span>Don't have an account?</span>
          <Link to="/signup" className="hover:underline text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
