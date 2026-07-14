import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { MdAssignmentInd } from "react-icons/md";
import HrmsContext from "../../../context";
import "./index.css";

const Sidebar = () => {
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(HrmsContext);

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <RiDashboardHorizontalFill className="sidebar-icon" />,
    },
    {
      path: "/employees",
      label: "Employees",
      icon: <PiUsersThreeFill className="sidebar-icon" />,
    },
    {
      path: "/teams",
      label: "Teams",
      icon: <BsMicrosoftTeams className="sidebar-icon" />,
    },
    {
      path: "/assignedMembers",
      label: "Assigned Employees",
      icon: <MdAssignmentInd className="sidebar-icon" />,
    },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`sidebar-layout ${isMobileMenuOpen ? "open-mobile" : ""}`}>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                {item.icon}
                <span className="sidebar-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
