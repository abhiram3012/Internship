import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProblemDetails = () => {
  const { id } = useParams(); // Get the complaint ID from the route parameters
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the complaint details when the component mounts
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!problem) return <div className="text-center py-10">Problem not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="p-6 w-full max-w-3xl bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Problem Details</h1>
        <div className="space-y-4 text-sm sm:text-base lg:text-lg">
          <h2 className="text-xl sm:text-2xl font-semibold">Department: {problem.department}</h2>
          <p><strong>Raised By:</strong> {problem.raisedBy}</p>
          <p><strong>Phone Number:</strong> {problem.phoneNumber}</p>
          <p><strong>Problem Type:</strong> {problem.problemType}</p>
          {problem.problemType === 'other' && (
            <p><strong>Other Problem:</strong> {problem.otherProblem}</p>
          )}
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
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white text-sm sm:text-lg rounded hover:bg-blue-600 transition">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
