import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TechnicianProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(''); // State to hold the selected status
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/complain/getcomplaint/${id}`);
        setProblem(response.data);
        setStatus(response.data.status); // Initialize status
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        setError('Error fetching problem details');
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/complain/updatestatus/${id}`, { status });
      setUpdateMessage('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      setUpdateMessage('Failed to update status');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!problem) return <div className="text-center py-10">Problem not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="p-6 w-full max-w-3xl bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Problem Details</h1>
        <div className="space-y-4 text-sm sm:text-base lg:text-lg">
          <h2 className="text-xl sm:text-2xl font-semibold">Department: {problem.department}</h2>
          <p><strong>Raised By:</strong> {problem.raisedBy.fullname}</p>
          <p><strong>Phone Number:</strong> {problem.phoneNumber}</p>
          <p><strong>Problem Type:</strong> {problem.problemType}</p>
          {problem.problemType === 'other' && (
            <p><strong>Other Problem:</strong> {problem.otherProblem}</p>
          )}
          <p><strong>Location:</strong> {problem.location}</p>
          <p><strong>Problem Details:</strong> {problem.problemDetails}</p>
          <p><strong>Under Warranty:</strong> {problem.isUnderWarranty ? 'Yes' : 'No'}</p>
          <p><strong>Steps Taken:</strong> {problem.stepsTaken}</p>
          <p><strong>Initial Addressed By:</strong> {problem.initialAddressedBy}</p>
          <p><strong>Department Contact Phone:</strong> {problem.deptContactPhoneNumber}</p>
          {problem.otherInfo && <p><strong>Other Info:</strong> {problem.otherInfo}</p>}
          <p><strong>Raised At:</strong> {new Date(problem.createdAt).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(problem.createdAt).toLocaleTimeString()}</p>

          <div className="mt-6">
            <label className="block text-lg font-medium mb-2">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded text-base"
            >
              <option value="raised">Raised</option>
              <option value="assigned">Assigned</option>
              <option value="checked">Checked</option>
              <option value="in progress">In Progress</option>
              <option value="rejected">Rejected</option>
              <option value="solved">Solved</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Update Status
            </button>
            {updateMessage && <p className="mt-4 text-center text-green-500">{updateMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProblemDetails;
