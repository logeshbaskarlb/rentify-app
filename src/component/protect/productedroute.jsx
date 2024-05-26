import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {  isAuthenticated } from "./AuthService";
import { useSelector } from "react-redux";

export function PrivateRoute({allowedRoles}) {
  const { token, userRole } = useSelector((state) => state.root);

  if (!isAuthenticated() || !token) {
    return <Navigate to="/login" />;
  }


  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;

  
  }