import React from 'react';

const HistoryComponents = () => {
  // Dummy data for testing
  const complaints = [
    {
      id: 1,
      problemName: 'Hardware Issue',
      raisedDate: '2024-08-20',
      technicianAssigned: 'John Doe',
      status: 'Completed',
    },
    {
      id: 2,
      problemName: 'Software Bug',
      raisedDate: '2024-08-21',
      technicianAssigned: 'Jane Smith',
      status: 'In Progress',
    },
    {
      id: 3,
      problemName: 'Network Problem',
      raisedDate: '2024-08-22',
      technicianAssigned: 'Michael Johnson',
      status: 'Rejected',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">History of Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Problem Name</th>
              <th className="px-4 py-2 border">When Raised</th>
              <th className="px-4 py-2 border">Technician Assigned</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-4 py-2 border">{complaint.problemName}</td>
                <td className="px-4 py-2 border">{complaint.raisedDate}</td>
                <td className="px-4 py-2 border">{complaint.technicianAssigned}</td>
                <td className={`px-4 py-2 border ${complaint.status === 'Completed' ? 'text-green-500' : complaint.status === 'In Progress' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {complaint.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryComponents;
