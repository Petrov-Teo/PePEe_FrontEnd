import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, role }) => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

  if (!auth || !auth.role) {
    return <Navigate to="/login-staff" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // `children` deve essere un nodo React
  role: PropTypes.string.isRequired, // `role` deve essere una stringa
};

export default PrivateRoute;
