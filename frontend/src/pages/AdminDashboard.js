import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  DocumentPlusIcon,
  ClockIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  UsersIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Token validation function
const validateToken = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle navigation with token validation
  const handleNavigation = (path) => {
    if (validateToken()) {
      navigate(path);
      setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    } else {
      navigate('/'); // Redirect to login if token is invalid
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Redirect to login page
    setIsSidebarOpen(false); // Close sidebar on mobile after logout
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
  className="md:hidden p-4 focus:outline-none"
  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
>
  {/* Hamburger icon */}
  <div className="space-y-1">
    <div className="w-6 h-0.5 bg-black"></div>
    <div className="w-6 h-0.5 bg-black"></div>
    <div className="w-6 h-0.5 bg-black"></div>
  </div>
</button>


      {/* Sidebar */}
      <Card
        className={`fixed top-0 left-0 h-screen p-4 shadow-xl shadow-blue-gray-900/5
        ${isSidebarOpen ? "w-full max-w-xs" : "w-0"}
        md:w-[20rem] transition-all duration-300 ease-in-out
        overflow-hidden md:overflow-visible bg-white z-50`}
      >
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => handleNavigation('/admin/dashboard')}>
            <ListItemPrefix>
              <DocumentChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => handleNavigation('/admin/new-complaints')}>
            <ListItemPrefix>
              <ExclamationTriangleIcon className="h-5 w-5" />
            </ListItemPrefix>
            New Complaints
          </ListItem>
          <ListItem onClick={() => handleNavigation('/admin/history')}>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            History
          </ListItem>
          <ListItem onClick={() => handleNavigation('/admin/complain')}>
            <ListItemPrefix>
              <DocumentPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Raise Complaint
          </ListItem>
          <ListItem onClick={() => handleNavigation('/admin/users')}>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
          <ListItem onClick={() => handleNavigation('/admin/profile')}>
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
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
