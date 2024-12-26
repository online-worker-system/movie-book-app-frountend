import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import OtpInput from "react-otp-input";
import { signUpApi } from "../../redux/reducer/authSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const CustomOtpInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { signupData, isLoading } = useSelector((state) => state.auth);
  
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isMobile2 = useMediaQuery({ query: "(max-width: 430px)" });

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

    if (signUpApi.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 sm:mt-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Verify OTP
        </h1>
        <form
          onSubmit={handleVerifyAndSignup}
          style={{
            padding: isMobile2 && "12px",
          }}
          className="mt-5 p-5 sm:p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
          {isMobile2 && (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span>-</span>}
              inputStyle={{
                width: "2.4rem",
                height: "2.4rem",
                margin: "0.15rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "0.375rem",
              }}
              renderInput={(props) => <input {...props} name="otp" />}
            />
          )}

          {isMobile && !isMobile2 && (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span>-</span>}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0.2rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "0.375rem",
              }}
              renderInput={(props) => <input {...props} name="otp" />}
            />
          )}

          {!isMobile && (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span>-</span>}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0.4rem",
                fontSize: "1.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.375rem",
              }}
              renderInput={(props) => <input {...props} name="otp" />}
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 text-sm sm:text-base bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomOtpInput;
