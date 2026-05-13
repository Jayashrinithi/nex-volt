// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "./auth";

export default function PrivateRoute({ children }) {
  return Auth.isAuthenticated ? children : <Navigate to="/" />;
}