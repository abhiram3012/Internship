import React from 'react';
import { useParams } from 'react-router-dom';

const dummyData = [
  { id: 1, name: 'Issue with Laptop', date: '2024-08-20', type: 'Hardware', details: 'The laptop is not turning on. It might be a hardware issue.' },
  { id: 2, name: 'Software Crash', date: '2024-08-22', type: 'Software', details: 'The application crashes on startup. Reinstall might help.' },
  { id: 3, name: 'Server Downtime', date: '2024-08-23', type: 'Server', details: 'The server is down since the morning. It requires immediate attention.' },
  // Add more dummy data as needed
];

const ProblemDetails = () => {
  const { id } = useParams();
  const problem = dummyData.find(p => p.id === parseInt(id));

  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-2xl bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">Problem Details</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Problem Name: {problem.name}</h2>
          <p className="text-lg"><strong>Date Raised:</strong> {problem.date}</p>
          <p className="text-lg"><strong>Type:</strong> {problem.type}</p>
          <p className="text-lg"><strong>Details:</strong> {problem.details}</p>
        </div>
        <div className="text-center mt-6">
          <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
