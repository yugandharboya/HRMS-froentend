import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import adminPhoto from "../../../assets/images/admin.JPG";
import HrmsContext from "../../../context";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(HrmsContext);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/auth/login");
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <button
          className="mobile-hamburger-btn"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link to="/" className="header-brand">
          <div className="brand-logo-icon">
            <HiBuildingOffice2 />
          </div>
          <h1 className="website-title">HRMS Portal</h1>
        </Link>
      </div>

      <div className="header-nav-container">
        <div className="user-profile-badge">
          <img
            src={adminPhoto}
            className="admin-photo"
            alt="Admin Avatar"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="admin-photo-fallback" style={{ display: "none" }}>
            <FiUser />
          </div>
          <span className="admin-name">Administrator</span>
        </div>

        <button className="logout-button" onClick={handleLogout} title="Logout">
          <FiLogOut className="logout-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
