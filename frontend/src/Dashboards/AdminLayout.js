import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import logo from '../assets/logo.png';

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminDashboard />
      <div className="flex-1 p-4 md:ml-[20rem]"> {/* Use flex-1 to take remaining space */}
        <img src={logo} alt="Logo" className="h-20 w-auto mb-4" /> {/* Set height to 80px */}
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
};

export default AdminLayout;
