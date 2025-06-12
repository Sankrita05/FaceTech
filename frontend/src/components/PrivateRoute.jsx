import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists, allow access to route
  return children;
};

export default PrivateRoute;
