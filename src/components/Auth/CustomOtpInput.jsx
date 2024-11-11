import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input"; // This is the external library
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpApi, signUpApi } from "../../redux/reducer/authSlice"; // Corrected import

function CustomOtpInput() { // Renamed component
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup =async (e) => {
    e.preventDefault();


    console.log(signupData)
    if (!signupData) return; // Prevent submission if signupData is not available

    const { accountType, userName, lastName, email, contactNumber, password,confirmPassword } = signupData;

   const resultAction=await dispatch(
      signUpApi({
        otp,
        email,
        accountType,
        userName,
        lastName,
        contactNumber,
        password,
        confirmPassword,
        navigate,
      })
    );

    if (signUpApi.fulfilled.match(resultAction)) {
        console.log("evething is woring")
        navigate('/');  // Redirect upon successful login
      } else {
        console.log("please enter correct otp:", resultAction.payload || resultAction.error);
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

export default CustomOtpInput; // Updated export to match the new name
