import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  DocumentPlusIcon,
  ClockIcon,
  UserCircleIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

// Token validation function
const validateToken = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

export function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  // Function to handle navigation with token validation
  const handleNavigation = (path) => {
    if (validateToken()) {
      navigate(path);
      setIsOpen(false); // Close sidebar after navigation
    } else {
      navigate('/'); // Redirect to login if token is invalid
    }
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Redirect to the login page
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="md:hidden p-4 text-blue-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <Card
        className={`fixed top-0 left-0 h-screen p-4 shadow-xl shadow-blue-gray-900/5
          ${isOpen ? "w-full max-w-xs" : "w-0"}
          md:w-[20rem] transition-all duration-300 ease-in-out
          overflow-hidden md:overflow-visible bg-white z-50`}
      >
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => handleNavigation('/enduser/complain')}>
            <ListItemPrefix>
              <DocumentPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Raise Complaint
          </ListItem>
          <ListItem onClick={() => handleNavigation('/enduser/history')}>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            History
          </ListItem>
          <ListItem onClick={() => handleNavigation('/enduser/profile')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>

      {/* Background overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
