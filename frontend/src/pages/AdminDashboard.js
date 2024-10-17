import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// Token validation function
const validateToken = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Function to handle navigation with token validation
  const handleNavigation = (path) => {
    if (validateToken()) {
      navigate(path);
    } else {
      navigate('/'); // Redirect to login if token is invalid
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
        <ListItem onClick={() => handleNavigation('/admin/settings')}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={() => handleNavigation('/login')}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
