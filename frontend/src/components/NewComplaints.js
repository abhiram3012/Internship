import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewComplaints() {
  const [complaints, setComplaints] = useState([
    { 
      id: 1, 
      issueName: 'Network Down', 
      raisedBy: 'Alice Johnson', 
      problemType: 'Network', 
      details: 'Network down in building A'
    },
    { 
      id: 2, 
      issueName: 'Software Installation', 
      raisedBy: 'Bob Smith', 
      problemType: 'Software', 
      details: 'Need to install new antivirus'
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/admin/problem/${id}`);
  };

  const handleAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  };

  const handleTechnicianSelect = () => {
    // Logic to assign the technician to the complaint
    setShowAssignModal(false);
    setSelectedTechnician('');
    setSelectedComplaint(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Complaints</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name of Issue</th>
            <th className="border border-gray-300 p-2">Raised By</th>
            <th className="border border-gray-300 p-2">Problem Type</th>
            <th className="border border-gray-300 p-2">Details</th>
            <th className="border border-gray-300 p-2">Assign</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td className="border border-gray-300 p-2">{complaint.issueName}</td>
              <td className="border border-gray-300 p-2">{complaint.raisedBy}</td>
              <td className="border border-gray-300 p-2">{complaint.problemType}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  onClick={() => handleViewDetails(complaint.id)} 
                  className="text-blue-500 underline"
                >
                  View Details
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                <button 
                  onClick={() => handleAssign(complaint)} 
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Assign Technician</h3>
            <select 
              value={selectedTechnician} 
              onChange={(e) => setSelectedTechnician(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select Technician</option>
              <option value="Technician 1">Technician 1</option>
              <option value="Technician 2">Technician 2</option>
              <option value="Technician 3">Technician 3</option>
            </select>
            <button 
              onClick={handleTechnicianSelect} 
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Assign
            </button>
            <button 
              onClick={() => setShowAssignModal(false)} 
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewComplaints;
