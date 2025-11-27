import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddTeam = ({ setShowAddTeamForm, fetchTeams }) => {
  console.log("AddTeam component rendered");

  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const submitAddTeam = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("login timeout please login again");
      navigate("/auth/login");
      return;
    }
    try {
      const url = " http://localhost:5000/teams";
      const teamDetails = { name: teamName, description: teamDescription };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamDetails),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        alert("Team added successfully");
        setShowAddTeamForm(false);
        fetchTeams();
      } else {
        throw new Error("Failed to add team");
      }
    } catch (error) {
      alert("err occurred while adding the team");
    }
  };

  return (
    <div className="add-team-form-container">
      <form className="add-team-form" onSubmit={submitAddTeam}>
        <div className="form-field">
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="teamDescription">Team Description:</label>
          <textarea
            id="teamDescription"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />
        </div>
        <div className="add-team-buttons-container">
          <button type="submit" className="save-team-button">
            Save Team
          </button>
          <button
            className="close-add-team-button"
            onClick={() => setShowAddTeamForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddTeam;
