import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { sendOtpApi, signUpApi } from "../../redux/reducer/authSlice";

function CustomOtpInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    console.log("signup data: ", signupData);
    if (!signupData) return;

    const {
      accountType,
      userName,
      lastName,
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
        lastName,
        contactNumber,
        password,
        confirmPassword,
      })
    );
    console.log("signup res: ", result);

    if (signUpApi.fulfilled.match(result)) {
      navigate("/");
    } else {
      console.log("please enter correct otp:", result.payload || result.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleVerifyAndSignup}>
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
        <button type="submit" className="mt-4">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default CustomOtpInput;
