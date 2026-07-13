import { BASE_URL } from "../../../constants/constants";
import "./index.css";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import HrmsContext from "../../../context";

const EditEmployeeForm = () => {
  const { employeeToEdit, setEmployeeToEdit, fetchEmployees } =
    useContext(HrmsContext);

  const [firstName, setFirstName] = useState(employeeToEdit.first_name);
  const [lastName, setLastName] = useState(employeeToEdit.last_name);
  const [email, setEmail] = useState(employeeToEdit.email);
  const [phone, setPhone] = useState(employeeToEdit.phone);

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
      const url = `${BASE_URL}/employees/${employeeToEdit.id}`;
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
      await fetchEmployees();
      alert("Employee details updated successfully!");
      setEmployeeToEdit(null);
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
      <button className="cancel-button" onClick={() => setEmployeeToEdit(null)}>
        Cancel
      </button>
    </div>
  );
};
export default EditEmployeeForm;
