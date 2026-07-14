import { deleteEmployeeApi } from "../../../services/api";

const DeleteEmployee = async (id, onSuccess, onError) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  try {
    await deleteEmployeeApi(id);
    if (onSuccess) await onSuccess();
  } catch (error) {
    console.error("Error deleting employee:", error);
    if (onError) {
      onError(error.message);
    } else {
      alert(`Failed to delete employee: ${error.message}`);
    }
  }
};

export default DeleteEmployee;
