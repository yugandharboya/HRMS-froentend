import "./index.css";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsMicrosoftTeams } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar-layout">
      <div className="sidebar-element">
        <RiDashboardHorizontalFill className="sidebar-icon" />
        <p className="sidebar-item">Dashboard</p>
      </div>

      <div className="sidebar-element">
        <PiUsersThreeFill className="sidebar-icon" />
        <p className="sidebar-item">Employees</p>
      </div>
      <div className="sidebar-element">
        <BsMicrosoftTeams className="sidebar-icon" />
        <p className="sidebar-item">Teams</p>
      </div>
    </div>
  );
};

export default Sidebar;
