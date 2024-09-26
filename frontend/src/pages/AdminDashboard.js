import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  DocumentChartBarIcon, // New icon for Dashboard
  ExclamationTriangleIcon, // New icon for New Complaints
  UserCircleIcon,
  Cog6ToothIcon,
  UsersIcon, // New icon for Users
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-9000/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => navigate('/admin/dashboard')}>
          <ListItemPrefix>
            <DocumentChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => navigate('/admin/new-complaints')}>
          <ListItemPrefix>
            <ExclamationTriangleIcon className="h-5 w-5" />
          </ListItemPrefix>
          New Complaints
        </ListItem>
        <ListItem onClick={() => navigate('/admin/users')}>
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem onClick={() => navigate('/admin/profile')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
