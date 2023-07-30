import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  const token = JSON.parse(window.localStorage.getItem("userInfo"));
  const isAuthenticated = token && token._id; // Verifica si el token existe y tiene un ID válido

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRouter;
