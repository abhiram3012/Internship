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
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// Token validation function
const validateToken = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

export function Sidebar() {
  const navigate = useNavigate();

  // Function to handle navigation with token validation
  const handleNavigation = (path) => {
    if (validateToken()) {
      navigate(path);
    } else {
      navigate('/'); // Redirect to login if token is invalid
    }
  };

  const handleLogout = (path) => {
    if (path === '/') {
      // Implementing the logout logic
      console.log("in the logout part");
      localStorage.removeItem('token'); // Remove the token (or session storage item)
      navigate('/'); // Redirect to the login page
    } else {
      navigate(path); // Navigate to the provided path
    }
  };

  return (
    <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-9000/5">
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
        <ListItem onClick={() => handleNavigation('/enduser/settings')}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={() => handleLogout('/')}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
