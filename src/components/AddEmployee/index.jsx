import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({ setActiveEmployeeToAdd, fetchDatabase }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const addEmployeeForm = async (event) => {
    event.preventDefault();
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      navigate("/login");
      return;
    }

    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };

    const url = `https://hrms-backend-0bid.onrender.com/employees`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEmployee),
    };
    const response = await fetch(url, options);
    console.log("Add employee response:", response);
    if (response.ok) {
      await fetchDatabase();
      alert("Employee added successfully!");
      setActiveEmployeeToAdd(false);
    } else {
      const data = await response.json();
      alert(`Failed to add employee: ${data.error_msg}`);
    }
  };
  return (
    <div className="add-employee-container">
      <h2 className="add-employee-heading">Add Employee</h2>
      <form className="add-employee-form" onSubmit={addEmployeeForm}>
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <button type="submit" className="add-employee-btn">
          Add Employee
        </button>
      </form>
      <button
        className="cancel-add-employee-btn"
        onClick={() => setActiveEmployeeToAdd(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddEmployee;
