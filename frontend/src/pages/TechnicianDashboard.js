import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// Token validation function
const validateToken = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

export default function TechnicianDashboard() {
  const navigate = useNavigate();

  // Function to handle navigation with token validation
  const handleNavigation = (path) => {
    if (validateToken()) {
      navigate(path);
    } else {
      navigate('/login'); // Redirect to login if token is invalid
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
        <ListItem onClick={() => handleNavigation('/technician/my-tasks')}>
          <ListItemPrefix>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Tasks
        </ListItem>
        <ListItem onClick={() => handleNavigation('/technician/new-problems')}>
          <ListItemPrefix>
            <ClipboardDocumentListIcon className="h-5 w-5" />
          </ListItemPrefix>
          New Problems
        </ListItem>
        <ListItem onClick={() => handleNavigation('/technician/history')}>
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          History
        </ListItem>
        <ListItem onClick={() => handleNavigation('/technician/inbox')}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="2" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={() => handleNavigation('/technician/profile')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
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
