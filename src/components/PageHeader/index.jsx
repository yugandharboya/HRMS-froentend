import React, { useContext } from "react";
import HrmsContext from "../../context";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import "./index.css";

const PageHeader = ({ employeesCount, title = "Employee Management" }) => {
  const { setShowAddEmployeeForm } = useContext(HrmsContext);

  return (
    <div className="page-header-card">
      <div className="page-header-title-box">
        <FiUsers className="header-title-icon" />
        <h2>
          {title} <span className="header-count">({employeesCount})</span>
        </h2>
      </div>
      <button
        className="btn-add-employee"
        onClick={() => setShowAddEmployeeForm(true)}
      >
        <FiUserPlus />
        <span>Add Employee</span>
      </button>
    </div>
  );
};

export default PageHeader;
