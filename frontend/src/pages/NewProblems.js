import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/complain/getcomplaints/raised'); // replace with actual backend endpoint
        setProblems(response.data);
      } catch (err) {
        setError('Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left">
        New Problems
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-3 sm:px-4 border-b">Problem Details</th>
              <th className="py-2 px-3 sm:px-4 border-b">Date Raised</th>
              <th className="py-2 px-3 sm:px-4 border-b">Type</th>
              <th className="py-2 px-3 sm:px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {problems.length > 0 ? (
              problems.map((problem) => (
                <tr key={problem.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 sm:px-4 border-b">{problem.problemDetails}</td>
                  <td className="py-2 px-3 sm:px-4 border-b">{new Date(problem.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-3 sm:px-4 border-b">{problem.problemType}</td>
                  <td className="py-2 px-3 sm:px-4 border-b text-blue-500">
                    <Link to={`/technician/problemdetails/${problem._id}`} className="hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No new complaints raised
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewProblems;
