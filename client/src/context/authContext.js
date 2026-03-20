import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../api/axiosHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("asanaToken"));

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
      const response = await API_URL.post("/api/signin", data);
      if (!response.data?.token) {
        toast.error("Invalid credential");
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
  const logout = () => {};
  return (
    <AuthContext.Provider value={{ signup, signin, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, AuthContext, useAuth };
