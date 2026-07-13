import "./App.css";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { useReducer, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

import Home from "./Pages/Home";
import Teams from "./Pages/Teams";
import AssignedMembers from "./Pages/AssignedMembers";

import LoginAdmin from "./components/auth/LoginAdmin";
import RegisterAdmin from "./components/auth/RegisterAdmin";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HrmsContext from "./context";

import Employees from "./Pages/Employees";
import TeamsSection from "./components/teams/TeamsSection";

import AddTeamForm from "./components/teams/AddTeamForm";
import AddEmployeeForm from "./components/employees/AddEmployeeForm";
import EditEmployeeForm from "./components/employees/EditEmployeeForm";

function App() {
  const navigate = useNavigate();
  const { showAddTeamForm, showAddEmployeeForm, employeeToEdit } =
    useContext(HrmsContext);

  return (
    <>
      {showAddTeamForm && <AddTeamForm />}
      {showAddEmployeeForm && <AddEmployeeForm />}
      {employeeToEdit && <EditEmployeeForm />}

      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            // <ProtectedRoute>
            <Employees />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            // <ProtectedRoute>
            <Teams />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/assignedMembers"
          element={
            // <ProtectedRoute>
            <AssignedMembers />
            // </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginAdmin />} />
        <Route path="/auth/register" element={<RegisterAdmin />} />
      </Routes>
    </>
  );
}

export default App;
