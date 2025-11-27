import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddTeam from "../AddTeam";

const Teams = ({ setShowAddTeamForm, teamsList }) => {
  const navigate = useNavigate();

  console.log("Teams component rendered with teams:", teamsList);

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h2 className="teams-header-title">Teams</h2>
        <button
          className="add-team-button"
          onClick={() => setShowAddTeamForm(true)}
        >
          Add Team
        </button>
      </div>
      <ul className="teams-list">
        {teamsList.length === 0 ? (
          <p>No teams available</p>
        ) : (
          teamsList.map((team) => (
            <li key={team.id} className="team-item">
              <h4 className="team-name">{team.name}</h4>
              <p className="team-employees-text">3 employees</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default Teams;
