import React from "react";
import { Navigate, json } from "react-router-dom";

function PrivateRouter({ children }) {
  const token = JSON.parse(window.localStorage.getItem("userInfo"));
  return token._id ? children : <Navigate to="/login" />;
}

export default PrivateRouter;
