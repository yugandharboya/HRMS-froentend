import "./index.css";
import React from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import adminPhoto from "../../../assets/images/admin.JPG";

const Header = () => {
  const token = Cookies.get("jwt_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
    Cookies.remove("jwt_token");
  };
  return (
    <header className="header-container">
      <h1 className="website-title">HRMS</h1>

      <div className="header-nav-container">
        <button className="admin-button">
          <img src={adminPhoto} className="admin-photo" alt="Admin" />
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
