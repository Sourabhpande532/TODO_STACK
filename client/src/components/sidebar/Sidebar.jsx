import React from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Workasana</h2>

      <nav style={styles.nav}>
        <Link to='/' style={styles.link}>
          Dashboard
        </Link>
        <Link to='/project' style={styles.link}>
          Project
        </Link>
        <Link to='/report' style={styles.link}>
          Report
        </Link>
        <Link to='/team' style={styles.link}>
          Team
        </Link>
      </nav>

      <div style={styles.bottom}>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        ) : (
          <Link to='/signin' style={styles.link}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  logo: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  bottom: {
    position: "absolute",
    bottom: "20px",
  },
  button: {
    padding: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Sidebar;
