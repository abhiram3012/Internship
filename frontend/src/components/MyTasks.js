import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for making API requests
import { useSelector } from 'react-redux';

const MyTasks = () => {
  const user = useSelector((state) => state.user); // Access user from Redux store
  const [tasks, setTasks] = useState([]);

  // Fetch tasks assigned to the technician
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.uid) {
          const response = await axios.get(`http://localhost:5000/api/complain/getcomplaints/technician/${user.uid}`);
          // Set the tasks to the response data (array of tasks)
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  // Show a fallback UI while user data or tasks are loading
  if (!user || !user.uid) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="overflow-x-auto">
        {tasks.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.problemDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}{task.assignedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={`/technician/problem/${task._id}`} className="text-blue-500 hover:text-blue-700">View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks assigned to you.</p> // Fallback when no tasks are assigned
        )}
      </div>
    </div>
  );
};

export default MyTasks;
