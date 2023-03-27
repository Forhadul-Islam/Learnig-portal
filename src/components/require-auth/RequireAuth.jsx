import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole, auth }) => {
  const location = useLocation();

  if (auth?.role == allowedRole) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
