import { useState, useEffect, useContext, createContext } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  async function checkTokenIsValid() {
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    try {
      let response = await fetch(
        "http://localhost:5000/api/v1/auth/testToken",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("shi khel gya bc");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
