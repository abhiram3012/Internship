import React from 'react';
import { Outlet } from 'react-router-dom';
import TechnicianDashboard from '../pages/TechnicianDashboard';

const TechnicianLayout = () => {
  return (
    <div className="flex flex-col md:flex-row"> {/* Stacks elements on small screens, arranges horizontally on medium screens and above */}
      <TechnicianDashboard />
      <div className="flex-1 p-4 md:ml-[20rem]"> {/* Use flex-1 to fill remaining space and responsive margin */}
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
}

export default TechnicianLayout;
