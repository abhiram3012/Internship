import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state)=>state.user);
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  const userRole = user.role;
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }// Redirect to login if not authenticated
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect if the role is unauthorized
  }
  return children;
};

export default ProtectedRoute;
