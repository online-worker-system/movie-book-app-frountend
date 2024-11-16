import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginApi } from "../../redux/reducer/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginApi(formData));
    if (loginApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="mt-7 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Login</h1>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
      >
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
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="relative">
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
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLoading ? "Signing..." : "Sign In"}
          </button>
          <div className="mt-3 flex justify-center text-sm text-richblack-500 gap-1">
            <span>Don't have an account ?</span>
            <Link to="/signup" className="hover:underline text-blue-500">
              Register
            </Link>
          </div>
          <div className="mt-3 flex justify-end text-sm text-richblack-500">
            <Link
              to="/forgot-password"
              className="hover:underline text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
