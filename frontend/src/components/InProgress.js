import React from 'react';

function InProgress() {
  const inProgressProblems = [
    { id: 1, issueName: 'Network Latency', raisedBy: 'Alice Johnson', problemType: 'Network' },
    { id: 2, issueName: 'Email Server Down', raisedBy: 'Bob Smith', problemType: 'Server' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">In Progress</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name of Issue</th>
            <th className="border border-gray-300 p-2">Raised By</th>
            <th className="border border-gray-300 p-2">Problem Type</th>
          </tr>
        </thead>
        <tbody>
          {inProgressProblems.map((problem) => (
            <tr key={problem.id}>
              <td className="border border-gray-300 p-2">{problem.issueName}</td>
              <td className="border border-gray-300 p-2">{problem.raisedBy}</td>
              <td className="border border-gray-300 p-2">{problem.problemType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InProgress;
