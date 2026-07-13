import { BASE_URL } from "../../../constants/constants";
import Cookies from "js-cookie";
import HrmsContext from "../../../context";

const DeleteEmployee = async (id, fetchEmployees) => {
  const token = Cookies.get("jwt_token");
  if (!token) {
    alert("Authentication token not found. Please log in again.");
    navigate("/login");
    return;
  }
  try {
    const url = `${BASE_URL}/employees/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      await fetchEmployees();
      alert("User deleted successfully!");
    } else {
      alert("Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    alert("An error occurred while deleting the employee.");
  }
};

export default DeleteEmployee;
