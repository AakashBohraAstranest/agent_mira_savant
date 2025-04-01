// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { JSX } from "react";

interface ProtectedRouteProps {
  element: JSX.Element;
}

// Protect routes based on Redux state
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;