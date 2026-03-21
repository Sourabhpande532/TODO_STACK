import React from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      <h5 className='logo'>workasana</h5>
      <Link to='/'>Dashboard</Link>
      <Link to='/project'>Project</Link>
      <Link to='/report'>Report</Link>
      <Link to='/pd'>Project Details</Link>
      {isAuthenticated ? (
        <Link to='/signin'>Logout</Link>
      ) : (
        <Link to='/signin'>Login</Link>
      )}
    </div>
  );
};

export default Sidebar;
