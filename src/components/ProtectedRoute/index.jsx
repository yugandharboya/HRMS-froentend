import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute rendered");
  const token = Cookies.get("jwt_token");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
