import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../api/axiosHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const userToken = localStorage.getItem("asanaToken");
  //   if (userToken) {
  //     setToken(userToken);
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        if (data.authenticated) {
          setToken("oauth-user"); // just a flag
        } else {
          setToken(null);
        }
      } catch (err) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = !!token;

  const signup = async (data) => {
    try {
      await API_URL.post("/api/signup", data);
      toast.success("Registration Successful");
      return true;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
      return false;
    }
  };
  /* signup({name:"x",email:"y@gmail.com",password:"*****"}) */
  const signin = async (data) => {
    try {
      const response = await API_URL.post("/api/signin", data, {
        withCredentials: true,
      });
      if (!response.data?.token) {
        toast.error("Invalid credential");
        return false;
      }
      localStorage.setItem("asanaToken", response.data.token);
      setToken(response.data.token);
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Invalid email or password");
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("asanaToken");
    setToken(null);
    toast.success("Logged out");
  };
  return (
    <AuthContext.Provider
      value={{ signup, signin, loading, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, AuthContext, useAuth };
