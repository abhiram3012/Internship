import React from 'react';
import { Outlet } from 'react-router-dom';
import TechnicianDashboard from '../pages/TechnicianDashboard';
import logo from '../assets/logo.png';


const TechnicianLayout = () => {
  return (
    <div className="flex flex-col md:flex-row"> {/* Stacks elements on small screens, arranges horizontally on medium screens and above */}
      <TechnicianDashboard />
      <div className="flex-1 p-4 md:ml-[20rem]"> {/* Use flex-1 to take remaining space */}
        <img src={logo} alt="Logo" className="h-20 w-auto mb-4" /> {/* Set height to 80px */}
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
}

export default TechnicianLayout;
