import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  // For now I don't have any landing page.. But in futeure I will create one.. So I am just redirecting to login for now
  return <Navigate to="/login" replace={true} />;
};

export default Home;
