import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complain/getcomplaints');
        const complaints = response.data.filter(complaint =>
          ['raised'].includes(complaint.status)
        );
        setComplaints(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/technician/getAll');
      setTechnicians(response.data);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/problem/${id}`);
  };

  const handleAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
    fetchTechnicians();
  };

  const handleTechnicianSelect = async () => {
    try {
      if (!selectedTechnician) {
        alert('Please select a technician');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/complain/assign/${selectedComplaint._id}`, 
        { technicianId: selectedTechnician }
      );

      if (response.status === 200) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === selectedComplaint._id
              ? { ...complaint, assignedTo: selectedTechnician, status: 'assigned' }
              : complaint
          )
        );
      } else {
        console.error('Failed to assign technician:', response);
      }

      setShowAssignModal(false);
      setSelectedTechnician('');
      setSelectedComplaint(null);
    } catch (error) {
      console.error('Error assigning technician:', error);
      alert('Failed to assign technician');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Problem Details</th>
              <th className="border border-gray-300 p-2">Problem Type</th>
              <th className="border border-gray-300 p-2">Details</th>
              <th className="border border-gray-300 p-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="border border-gray-300 p-2">{complaint.problemDetails}</td>
                <td className="border border-gray-300 p-2">{complaint.problemType}</td>
                <td className="border border-gray-300 p-2">
                  <button 
                    onClick={() => handleViewDetails(complaint._id)}
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
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold mb-4">Assign Technician</h3>
            <select 
              value={selectedTechnician} 
              onChange={(e) => setSelectedTechnician(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select Technician</option>
              {technicians.map((technician) => (
                <option key={technician._id} value={technician._id}>
                  {technician.fullname}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button 
                onClick={handleTechnicianSelect} 
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              >
                Assign
              </button>
              <button 
                onClick={() => setShowAssignModal(false)} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewComplaints;
