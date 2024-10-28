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
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left">
        New Problems
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-3 sm:px-4 border-b">Problem Name</th>
              <th className="py-2 px-3 sm:px-4 border-b">Date Raised</th>
              <th className="py-2 px-3 sm:px-4 border-b">Type</th>
              <th className="py-2 px-3 sm:px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 sm:px-4 border-b">{problem.name}</td>
                <td className="py-2 px-3 sm:px-4 border-b">{problem.date}</td>
                <td className="py-2 px-3 sm:px-4 border-b">{problem.type}</td>
                <td className="py-2 px-3 sm:px-4 border-b text-blue-500">
                  <Link to={`/technician/problem/${problem.id}`} className="hover:underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewProblems;
