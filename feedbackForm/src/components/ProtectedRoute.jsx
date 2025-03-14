import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <h2>Access Denied</h2>;
  }

  return children;
};

export default ProtectedRoute;
