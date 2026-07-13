import "./index.css";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link, useLocation } from "react-router-dom";
import HrmsContext from "../../../context";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
const TeamsSection = ({ variant }) => {
  const navigate = useNavigate();
  const {
    teamsState,
    fetchTeams,
    showAddTeamForm,
    setShowAddTeamForm,
    setActiveTeamId,
    activeTeamId,
  } = useContext(HrmsContext);
  return (
    <div className={`teams-container ${variant}`}>
      <div className="teams-header">
        <h2 className="teams-header-title">Teams ({teamsState.data.length})</h2>
        <button
          className="add-team-button"
          onClick={() => setShowAddTeamForm((prev) => !prev)}
        >
          Add Team
        </button>
      </div>
      <ul className="teams-list">
        {teamsState.data.length === 0 ? (
          <p>No teams available</p>
        ) : (
          teamsState.data.map((team) => (
            <li
              className={activeTeamId === team.id ? "active-team-card" : ""}
              key={team.id}
            >
              <Link
                // to={`/teamMembers`}
                className="team-card"
                onClick={() => setActiveTeamId(team.id)}
              >
                <h4 className="team-name">{team.name}</h4>
                <p className="team-employees-text">employees</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default TeamsSection;
