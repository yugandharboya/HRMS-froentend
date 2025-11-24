import "./index.css";
import { useState } from "react";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  return (
    <div className="teams-container">
      <div className="teams-header">
        <h2>Teams</h2>
        <button className="add-team-button">Add Team</button>
      </div>
    </div>
  );
};
export default Teams;
