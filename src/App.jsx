import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingView from "./components/common/LoadingView";
import HrmsContext from "./context";

// Lazy-loaded Page Routes
const Home = lazy(() => import("./Pages/Home"));
const Employees = lazy(() => import("./Pages/Employees"));
const Teams = lazy(() => import("./Pages/Teams"));
const AssignedMembers = lazy(() => import("./Pages/AssignedMembers"));

const LoginAdmin = lazy(() => import("./components/auth/LoginAdmin"));
const RegisterAdmin = lazy(() => import("./components/auth/RegisterAdmin"));

// Modal Components
const AddTeamForm = lazy(() => import("./components/teams/AddTeamForm"));
const AddEmployeeForm = lazy(() => import("./components/employees/AddEmployeeForm"));
const EditEmployeeForm = lazy(() => import("./components/employees/EditEmployeeForm"));
const AssignTeam = lazy(() => import("./components/teams/AssignTeam"));

function App() {
  const {
    showAddTeamForm,
    showAddEmployeeForm,
    employeeToEdit,
    assignEmployeeId,
  } = useContext(HrmsContext);

  return (
    <>
      <Suspense fallback={<LoadingView />}>
        {showAddTeamForm && <AddTeamForm />}
        {showAddEmployeeForm && <AddEmployeeForm />}
        {employeeToEdit && <EditEmployeeForm />}
        {assignEmployeeId && <AssignTeam />}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignedMembers"
            element={
              <ProtectedRoute>
                <AssignedMembers />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginAdmin />} />
          <Route path="/auth/register" element={<RegisterAdmin />} />
          <Route path="*" element={<LoginAdmin />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
