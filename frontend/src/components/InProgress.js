import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InProgressComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complain/getcomplaints');
        console.log(response.data);
        const complaints = response.data.filter(complaint =>
          ['in progress', 'assigned', 'raised', 'checked'].includes(complaint.status)
        );
        setComplaints(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">In Progress Complaints</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Problem Details</th>
              <th className="border border-gray-300 p-2 text-left">Raised By</th>
              <th className="border border-gray-300 p-2 text-left">Problem Type</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="border border-gray-300 p-2">{complaint.problemDetails}</td>
                <td className="border border-gray-300 p-2">{complaint.raisedBy}</td>
                <td className="border border-gray-300 p-2">{complaint.problemType}</td>
                <td className="border border-gray-300 p-2">{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InProgressComplaints;
