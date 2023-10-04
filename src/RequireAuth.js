import React from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.logName) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
