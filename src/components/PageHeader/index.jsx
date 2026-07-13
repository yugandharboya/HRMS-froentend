import "./index.css";
import HrmsContext from "../../context";
import { useContext } from "react";

const PageHeader = ({ employeesCount }) => {
  const { setShowAddEmployeeForm } = useContext(HrmsContext);
  return (
    <div className="page-header">
      <h2 className="main-content-header-title">
        Employees ({employeesCount})
      </h2>
      <button
        className="add-employee-button"
        onClick={() => setShowAddEmployeeForm((prev) => !prev)}
      >
        Add Employee
      </button>
    </div>
  );
};

export default PageHeader;
