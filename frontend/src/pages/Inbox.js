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
    <Card className="p-4 max-w-full md:max-w-lg mx-auto">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Inbox
      </Typography>
      <List>
        {tasks.map(task => (
          <ListItem
            key={task.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-200 p-3 rounded-lg"
          >
            <div className="flex items-center w-full md:w-auto">
              <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
              <div>
                <Typography variant="h6" color="blue-gray" className="text-sm md:text-base">
                  {task.name}
                </Typography>
                <Typography color="gray" className="text-xs md:text-sm">{task.type}</Typography>
              </div>
            </div>
            <Button
              onClick={() => handleTaskClick(task.id)}
              size="sm"
              className="mt-2 md:mt-0"
            >
              Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Inbox;
