import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;