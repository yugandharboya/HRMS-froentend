import React, { createContext, useState } from "react";

import {
  getEmployeesApi,
  getTeamsApi,
  getAssignedMembersApi,
} from "../services/api";

const HrmsContext = createContext();

export const HrmsContextProvider = ({ children }) => {
  const [employeesState, setEmployeesState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const [teamsState, setTeamsState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const [assignedMembersState, setAssignedMembersState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const [assignEmployeeId, setAssignEmployeeId] = useState("");
  const [assignEmployeeName, setAssignEmployeeName] = useState(null);

  const [activeTeamId, setActiveTeamId] = useState(null);

  const [showAddTeamForm, setShowAddTeamForm] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchEmployees = async () => {
    setEmployeesState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await getEmployeesApi();

      setEmployeesState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setEmployeesState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  const fetchTeams = async () => {
    setTeamsState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await getTeamsApi();

      setTeamsState({
        data,
        loading: false,
        error: null,
      });

      if (data.length > 0 && !activeTeamId) {
        setActiveTeamId(data[0].id);
      }
    } catch (error) {
      setTeamsState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  const fetchAssignedMembers = async () => {
    setAssignedMembersState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await getAssignedMembersApi();

      setAssignedMembersState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAssignedMembersState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  return (
    <HrmsContext.Provider
      value={{
        // feature states
        employeesState,
        teamsState,
        assignedMembersState,

        // fetchers
        fetchEmployees,
        fetchTeams,
        fetchAssignedMembers,

        // assign flow
        assignEmployeeId,
        setAssignEmployeeId,
        assignEmployeeName,
        setAssignEmployeeName,

        // active team
        activeTeamId,
        setActiveTeamId,

        // forms
        showAddTeamForm,
        setShowAddTeamForm,
        showAddEmployeeForm,
        setShowAddEmployeeForm,

        // edit
        employeeToEdit,
        setEmployeeToEdit,

        // mobile nav
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </HrmsContext.Provider>
  );
};

export default HrmsContext;
