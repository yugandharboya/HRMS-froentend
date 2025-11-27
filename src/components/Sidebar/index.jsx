import "./index.css";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsMicrosoftTeams } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar-layout">
      <div className="sidebar-element">
        <RiDashboardHorizontalFill className="sidebar-icon" />
        <button className="sidebar-item">Dashboard</button>
      </div>

      <div className="sidebar-element">
        <PiUsersThreeFill className="sidebar-icon" />
        <button className="sidebar-item">Employees</button>
      </div>
      <div className="sidebar-element">
        <BsMicrosoftTeams className="sidebar-icon" />
        <button className="sidebar-item">Teams</button>
      </div>
    </div>
  );
};

export default Sidebar;
