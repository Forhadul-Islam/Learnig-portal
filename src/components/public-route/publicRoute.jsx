import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = ({ auth }) => {
  if (auth?.role == "student") {
    return <Navigate to="/course-player" replace />;
  } else if (auth?.role == "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else return <Outlet />;
};

export default PublicRoute;
