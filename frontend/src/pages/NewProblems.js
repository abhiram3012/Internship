import React from 'react';
import { Link } from 'react-router-dom';

const dummyData = [
  { id: 1, name: 'Issue with Laptop', date: '2024-08-20', type: 'Hardware' },
  { id: 2, name: 'Software Crash', date: '2024-08-22', type: 'Software' },
  { id: 3, name: 'Server Downtime', date: '2024-08-23', type: 'Server' },
  // Add more dummy data as needed
];

const NewProblems = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Problems</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Problem Name</th>
            <th className="py-2 px-4 border-b">Date Raised</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map(problem => (
            <tr key={problem.id}>
              <td className="py-2 px-4 border-b">{problem.name}</td>
              <td className="py-2 px-4 border-b">{problem.date}</td>
              <td className="py-2 px-4 border-b">{problem.type}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/technician/problem/${problem.id}`} className="text-blue-500">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewProblems;
