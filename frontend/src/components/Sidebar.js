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
  
  export function Sidebar() {
    const navigate = useNavigate();
    return (
      <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-9000/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => navigate('/enduser/complain')}>
            <ListItemPrefix>
              <DocumentPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Raise Complaint
          </ListItem>
          <ListItem onClick={() => navigate('/enduser/history')}>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            History
          </ListItem>
          
          <ListItem onClick={() => navigate('/enduser/profile')}>
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
  