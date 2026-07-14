import React, { useContext } from "react";
import HrmsContext from "../../../context";
import { FiPlus, FiUsers, FiLayers } from "react-icons/fi";
import "./index.css";

const TeamsSection = ({ variant = "" }) => {
  const {
    teamsState,
    setShowAddTeamForm,
    setActiveTeamId,
    activeTeamId,
  } = useContext(HrmsContext);

  return (
    <div className={`teams-section-card ${variant}`}>
      <div className="teams-header">
        <div className="teams-title-badge">
          <FiLayers className="teams-icon" />
          <h2>Teams ({teamsState.data.length})</h2>
        </div>
        <button
          className="add-team-btn"
          onClick={() => setShowAddTeamForm(true)}
        >
          <FiPlus />
          <span>Add Team</span>
        </button>
      </div>

      <div className="teams-grid">
        {teamsState.data.length === 0 ? (
          <div className="empty-teams-box">
            <p>No teams created yet.</p>
          </div>
        ) : (
          teamsState.data.map((team) => {
            const isActive = activeTeamId === team.id;
            return (
              <div
                key={team.id}
                className={`team-card ${isActive ? "active" : ""}`}
                onClick={() => setActiveTeamId(team.id)}
              >
                <div className="team-card-header">
                  <span className="team-name">{team.name}</span>
                  <FiUsers className="team-card-icon" />
                </div>
                <p className="team-desc">
                  {team.description || "Active Workspace Team"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeamsSection;
