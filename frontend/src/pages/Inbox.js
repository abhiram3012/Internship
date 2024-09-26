import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, List, ListItem, Button } from '@material-tailwind/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'; // Adjust icon as needed

const tasks = [
  { id: '1', name: 'Problem with Server', type: 'Server', description: 'Detailed description of Task 1' },
  { id: '2', name: 'Printer Issue', type: 'Hardware', description: 'Detailed description of Task 2' },
  // Add more tasks here
];

const Inbox = () => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/technician/problem/${taskId}`);
  };

  return (
    <Card className="p-4">
      <Typography variant="h5" color="blue-gray">
        Inbox
      </Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} className="flex justify-between items-center hover:bg-gray-200 p-2">
            <div className="flex items-center">
              <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
              <div>
                <Typography variant="h6" color="blue-gray">{task.name}</Typography>
                <Typography color="gray">{task.type}</Typography>
              </div>
            </div>
            <Button onClick={() => handleTaskClick(task.id)} size="sm">Details</Button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Inbox;
