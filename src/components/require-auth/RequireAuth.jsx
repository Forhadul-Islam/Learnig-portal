import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRole, adminAlso }) => {
  const auth = useAuth();
  const location = useLocation();
  // function checkIsAllowed(role, auth){
  //   for(let i =0; i<role.length; i++){
  //     if(auth?.role == role[i]) return <Outlet />;
  //   }
  // }

  if (auth?.role == allowedRole || adminAlso) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default RequireAuth;
