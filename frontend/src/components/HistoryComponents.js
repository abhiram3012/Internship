import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const HistoryComponents = () => {
  const user = useSelector((state) => state.user);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch complaints from the API
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/complain/getcomplaints/user/${user.uid}`); // Replace with your actual API endpoint
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaints');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user.uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">History of Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Problem Detials</th>
              <th className="px-4 py-2 border text-left">When Raised</th>
              <th className="px-4 py-2 border text-left">Technician Assigned</th>
              <th className="px-4 py-2 border text-left">Mobile No of Technician</th>
              <th className="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-4 py-2 border">{complaint.problemDetails}</td>
                <td className="px-4 py-2 border">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{complaint.assignedTo==null? "Not yet assigned": complaint.assignedTo.fullname}</td>
                <td className="px-4 py-2 border">{complaint.assignedTo==null? "NA":complaint.assignedTo.phoneNumber}</td>
                <td className={`px-4 py-2 border ${
                  complaint.status === 'Completed'
                    ? 'text-green-500'
                    : complaint.status === 'In Progress'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}>
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
