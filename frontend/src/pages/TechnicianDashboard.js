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
  ClipboardDocumentCheckIcon, // Updated icon for My Tasks
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function TechnicianDashboard() {
  const navigate = useNavigate();
  return (
    <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-9000/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => navigate('/technician/my-tasks')}>
          <ListItemPrefix>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Tasks
        </ListItem>
        <ListItem onClick={() => navigate('/technician/new-problems')}>
          <ListItemPrefix>
            <ClipboardDocumentListIcon className="h-5 w-5" />
          </ListItemPrefix>
          New Problems
        </ListItem>
        <ListItem onClick={() => navigate('/technician/history')}>
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          History
        </ListItem>
        <ListItem onClick={() => navigate('/technician/inbox')}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="2" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={() => navigate('/technician/profile')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
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
