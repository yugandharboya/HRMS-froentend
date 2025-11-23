import "./index.css";
import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/auth/login");
    Cookies.remove("jwt_token");
  };
  return (
    <header className="header-layout">
      <h1 className="website-title">HRMS</h1>

      <div className="header-nav-container">
        <button className="admin-button">
          <GrUserAdmin className="admin-icon" />
          <p className="admin-text">Admin</p>
        </button>

        <button className="login-button">Login</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);
