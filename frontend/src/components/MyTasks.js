import React from 'react';

const dummyTasks = [
  { id: 1, name: 'Fix Laptop Overheating', assignedDate: '2024-08-25', status: 'In Progress', details: 'The laptop overheats during extended use.' },
  { id: 2, name: 'Update Software on Server', assignedDate: '2024-08-22', status: 'In Progress', details: 'The server software needs to be updated to the latest version.' },
  { id: 3, name: 'Repair Network Router', assignedDate: '2024-08-20', status: 'In Progress', details: 'The network router has been malfunctioning and requires repair.' },
  // Add more tasks as needed
];

const MyTasks = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="overflow-x-auto">
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
            {dummyTasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={`/technician/problem/${task.id}`} className="text-blue-500 hover:text-blue-700">View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
