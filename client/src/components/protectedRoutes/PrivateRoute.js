import React from "react";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if(loading){
    return <div>Loading...</div>
  }
  return isAuthenticated ? children : <Navigate to='/signin' replace />;
};

export default PrivateRoute;
