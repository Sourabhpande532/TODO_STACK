import React from "react";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to='/signin' replace />;
};

export default PrivateRoute;
