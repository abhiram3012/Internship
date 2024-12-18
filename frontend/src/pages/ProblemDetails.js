import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProblemDetails = () => {
  const user = useSelector((state)=>state.user);
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/complain/getcomplaint/${id}`);
        setProblem(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        setError('Error fetching problem details');
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [id]);

  const handleAcceptClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = async () => {
    try {
      // API call to assign the problem to the technician
      console.log(id);
      console.log(user.uid);
      await axios.put(`http://localhost:5000/api/complain/assignTechnician/${id}/${user.uid}`);
      alert('Complaint assigned successfully');
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Error assigning problem:', err);
      alert('Failed to assign complaint');
      setShowConfirmModal(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!problem) return <div className="text-center py-10">Problem not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="p-6 w-full max-w-3xl bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Problem Details</h1>
        <div className="space-y-4 text-sm sm:text-base lg:text-lg">
          {/* Display problem details */}
          <h2 className="text-xl sm:text-2xl font-semibold">Department: {problem.department}</h2>
          <p><strong>Raised By:</strong> {problem.raisedBy.fullname}</p>
          <p><strong>Phone Number:</strong> {problem.phoneNumber}</p>
          <p><strong>Problem Type:</strong> {problem.problemType}</p>
          {problem.problemType === 'other' && <p><strong>Other Problem:</strong> {problem.otherProblem}</p>}
          <p><strong>Location:</strong> {problem.location}</p>
          <p><strong>Problem Details:</strong> {problem.problemDetails}</p>
          <p><strong>Under Warranty:</strong> {problem.isUnderWarranty}</p>
          <p><strong>Steps Taken:</strong> {problem.stepsTaken}</p>
          <p><strong>Initial Addressed By:</strong> {problem.initialAddressedBy}</p>
          <p><strong>Department Contact Phone:</strong> {problem.deptContactPhoneNumber}</p>
          {problem.otherInfo && <p><strong>Other Info:</strong> {problem.otherInfo}</p>}
          <p><strong>Raised At:</strong> {new Date(problem.createdAt).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(problem.createdAt).toLocaleTimeString()}</p>
        </div>

        <div className="text-center mt-6">
          <button onClick={handleAcceptClick} className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white text-sm sm:text-lg rounded hover:bg-blue-600 transition">
            Accept
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4 text-center">
              <p className="text-lg">Do you want to accept this complaint?</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleConfirmAccept} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Yes</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;
