import { Navigate } from "react-router-dom";
import { useAuth } from "./users/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, userData } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login-staff" />;
  }

  const rolesArray = Array.isArray(role) ? role : role.split(",").map((r) => r.trim());

  if (!rolesArray.includes(userData.ruolo)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
