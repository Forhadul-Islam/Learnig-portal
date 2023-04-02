import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.role == "student") {
    return <Navigate to="/course-player/1" replace />;
  } else if (auth?.role == "admin") {
    return <Navigate to="/admin" replace />;
  } else return <Outlet />;
};

export default PublicRoute;
