import "./index.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import EmployeesTable from "../EmployeesTable";
import Teams from "../Teams";
import EditEmployee from "../EditEmployee";
import LoadingView from "../LoadingView";
import AddEmployee from "../AddEmployee";
import AddTeam from "../AddTeam";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useReducer } from "react";

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, fetchedEmployees: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Home = () => {
  const initialState = {
    fetchedEmployees: [],
    loading: false,
    error: null,
  };
  const [activeEmployeeToEdit, setActiveEmployeeToEdit] = useState(null);
  const [activeEmployeeToAdd, setActiveEmployeeToAdd] = useState(false);
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);
  const [teamsList, setTeamsList] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const fetchDatabase = async () => {
    dispatch({ type: "FETCH_START" });
    const token = Cookies.get("jwt_token");
    console.log("token", token);
    if (!token) {
      navigate("/auth/login");
      return;
    }
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "http://localhost:5000/employees";

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch employees");
        dispatch({ type: "FETCH_ERROR" });
      }

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const fetchTeams = async () => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    try {
      const url = "http://localhost:5000/teams";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();

      setTeamsList((prev) => [...data]);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = state.fetchedEmployees.find((emp) => emp.id === id);
    setActiveEmployeeToEdit(employeeToEdit);
  };
  const handleAddEmployee = () => {
    setActiveEmployeeToAdd(true);
  };
  useEffect(() => {
    fetchDatabase();
    fetchTeams();
  }, [state.fetchedEmployees.length]);

  return (
    <div className="home-page-layout">
      {activeEmployeeToEdit && (
        <EditEmployee
          employeeDetails={activeEmployeeToEdit}
          setActiveEmployeeToEdit={setActiveEmployeeToEdit}
          fetchDatabase={fetchDatabase}
        />
      )}
      {activeEmployeeToAdd && (
        <AddEmployee
          setActiveEmployeeToAdd={setActiveEmployeeToAdd}
          fetchDatabase={fetchDatabase}
        />
      )}
      {showAddTeamForm && (
        <AddTeam
          setShowAddTeamForm={setShowAddTeamForm}
          fetchTeams={fetchTeams}
        />
      )}
      <Header />
      <div className="layout-row">
        <Sidebar />
        <div className="main-content-area">
          {state.loading && <LoadingView />}
          {state.error && <p className="error-message">{state.error}</p>}
          {!state.loading && !state.error && (
            <>
              <div className="main-content-header">
                <h2 className="main-content-header-title">Employees</h2>
                <button
                  className="add-employee-button"
                  onClick={() => setActiveEmployeeToAdd((prev) => !prev)}
                >
                  Add Employee
                </button>
              </div>
              <main className="main-content">
                <EmployeesTable
                  fetchedEmployees={state.fetchedEmployees}
                  handleEditEmployee={handleEditEmployee}
                  fetchDatabase={fetchDatabase}
                  setActiveEmployeeToEdit={setActiveEmployeeToEdit}
                />
              </main>
              <div className="teams-section">
                <Teams
                  setShowAddTeamForm={setShowAddTeamForm}
                  teamsList={teamsList}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
