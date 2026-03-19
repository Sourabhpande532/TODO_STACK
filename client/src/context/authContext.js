import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../api/axiosHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const isAuthenticated = !!token;
  const signup = async (data) => {
    try {
      await API_URL.post("/api/signup", data);
      toast.success("Registration Successful");
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };
  /* signup({name:"x",email:"y@gmail.com",password:"*****"}) */
  const signin = async () => {
    try {
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Invalid email or password");
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
