import "./index.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import EmployeesTable from "../EmployeesTable";
import Teams from "../Teams";
import EditEmployee from "../EditEmployee";
import LoadingView from "../LoadingView";
import AddEmployee from "../AddEmployee";
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const fetchDatabase = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const token = Cookies.get("jwt_token");

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "https://hrms-backend-0bid.onrender.com/employees";

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

  const handleEditEmployee = (id) => {
    const employeeToEdit = state.fetchedEmployees.find((emp) => emp.id === id);
    setActiveEmployeeToEdit(employeeToEdit);
  };
  const handleAddEmployee = () => {
    setActiveEmployeeToAdd(true);
  };
  useEffect(() => {
    fetchDatabase();
  }, [state.fetchedEmployees.length]);

  console.log("Fetched Employees:", state.fetchedEmployees);
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
      <Header />
      <div className="content-layout">
        <Sidebar />
        <main className="main-content-area">
          <div className="main-content-header">
            <h2 className="main-content-header-title">Employees</h2>
            <button
              className="add-employee-button"
              onClick={() => setActiveEmployeeToAdd((prev) => !prev)}
            >
              Add Employee
            </button>
          </div>
          <div className="main-content">
            {state.loading && <LoadingView />}
            <EmployeesTable
              fetchedEmployees={state.fetchedEmployees}
              handleEditEmployee={handleEditEmployee}
              fetchDatabase={fetchDatabase}
              setActiveEmployeeToEdit={setActiveEmployeeToEdit}
            />
            <Teams />
          </div>
        </main>
      </div>
    </div>
  );
};
export default Home;
