import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { signUpApi } from "../../redux/reducer/authSlice";

const CustomOtpInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { signupData, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    if (!signupData) return;

    const {
      accountType,
      userName,
      email,
      contactNumber,
      password,
      confirmPassword,
    } = signupData;

    const result = await dispatch(
      signUpApi({
        otp,
        email,
        accountType,
        userName,
        contactNumber,
        password,
        confirmPassword,
      })
    );

    console.log("signup res: ", result);
    if (signUpApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="mt-32 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Verify OTP</h1>
      <form
        className="mt-5 min-w-80 mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
        onSubmit={handleVerifyAndSignup}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          separator={<span>-</span>}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            margin: "0.5rem",
            fontSize: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.375rem",
          }}
          renderInput={(props) => <input {...props} name="otp" />}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default CustomOtpInput;
