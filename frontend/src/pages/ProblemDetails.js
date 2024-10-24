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
        const response = await axios.get(`http://localhost:5000/api/complain/getcomplaint/${id}`); // Update with your actual endpoint
        setProblem(response.data); // Set the problem data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        setError('Error fetching problem details');
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-2xl bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">Problem Details</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Department: {problem.department}</h2>
          <p className="text-lg"><strong>Raised By:</strong> {problem.raisedBy}</p>
          <p className="text-lg"><strong>Phone Number:</strong> {problem.phoneNumber}</p>
          <p className="text-lg"><strong>Problem Type:</strong> {problem.problemType}</p>
          {problem.problemType === 'other' && (
            <p className="text-lg"><strong>Other Problem:</strong> {problem.otherProblem}</p>
          )}
          <p className="text-lg"><strong>Location:</strong> {problem.location}</p>
          <p className="text-lg"><strong>Problem Details:</strong> {problem.problemDetails}</p>
          <p className="text-lg"><strong>Under Warranty:</strong> {problem.isUnderWarranty}</p>
          <p className="text-lg"><strong>Steps Taken:</strong> {problem.stepsTaken}</p>
          <p className="text-lg"><strong>Initial Addressed By:</strong> {problem.initialAddressedBy}</p>
          <p className="text-lg"><strong>Department Contact Phone:</strong> {problem.deptContactPhoneNumber}</p>
          {problem.otherInfo && <p className="text-lg"><strong>Other Info:</strong> {problem.otherInfo}</p>}
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
