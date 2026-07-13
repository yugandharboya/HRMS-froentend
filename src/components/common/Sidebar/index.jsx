import "./index.css";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { MdAssignmentInd } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar-layout">
      <div className="sidebar-element">
        <RiDashboardHorizontalFill className="sidebar-icon" />
        <Link
          to="/"
          className={
            location.pathname === "/" ? "sidebar-item active" : "sidebar-item"
          }
        >
          Dashboard
        </Link>
      </div>

      <div className="sidebar-element">
        <PiUsersThreeFill className="sidebar-icon" />
        <Link
          to="/employees"
          className={
            location.pathname === "/employees"
              ? "sidebar-item active"
              : "sidebar-item"
          }
        >
          Employees
        </Link>
      </div>
      <div className="sidebar-element">
        <BsMicrosoftTeams className="sidebar-icon" />
        <Link
          to="/teams"
          className={
            location.pathname === "/teams"
              ? "sidebar-item active"
              : "sidebar-item"
          }
        >
          Teams
        </Link>
      </div>

      <div className="sidebar-element">
        <MdAssignmentInd className="sidebar-icon" />
        <Link
          to="/assignedMembers"
          className={
            location.pathname === "/assignedMembers"
              ? "sidebar-item active"
              : "sidebar-item"
          }
        >
          Assigned Employees
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
