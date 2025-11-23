import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";

const EditEmployee = ({
  employeeDetails,
  setActiveEmployeeToEdit,
  fetchDatabase,
}) => {
  const [firstName, setFirstName] = useState(employeeDetails.first_name);
  const [lastName, setLastName] = useState(employeeDetails.last_name);
  const [email, setEmail] = useState(employeeDetails.email);
  const [phone, setPhone] = useState(employeeDetails.phone);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }
    const updatedDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    try {
      const url = `https://hrms-backend-0bid.onrender.com/employees/${employeeDetails.id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      };
      const response = await fetch(url, options);
      console.log("Update response:", response.ok);
      if (!response.ok) {
        throw new Error("Failed to update employee details");
      }
      await fetchDatabase();
      alert("Employee details updated successfully!");
      setActiveEmployeeToEdit(null);
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };
  return (
    <div className="edit-employee-container">
      <h2 className="edit-employee-heading">Edit Employee </h2>
      <form className="edit-employee-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>

          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            className="form-input"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <button type="submit" className="save-employee-button">
          Save Changes
        </button>
      </form>
      <button
        className="cancel-button"
        onClick={() => setActiveEmployeeToEdit(null)}
      >
        Cancel
      </button>
    </div>
  );
};
export default EditEmployee;
