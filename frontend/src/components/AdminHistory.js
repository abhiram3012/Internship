import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const AdminHistory = () => {
  const user = useSelector((state) => state.user);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    problemDetails: '',
    raisedBy: '',
    department: '',
    phoneNumber: '',
    problemType: '',
    location: '',
    isUnderWarranty: '',
    stepsTaken: '',
    initialAddressedBy: '',
    deptContactPhoneNumber: '',
    otherInfo: '',
    createdAt: '',
    assignedTo: '',
    status: '',
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/complain/getcomplaints`);
        setComplaints(response.data);
        console.log(response.data);
        setFilteredComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaints');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user.uid]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = complaints.filter((complaint) => {
        return Object.keys(filters).every((key) =>
          filters[key]
            ? String(complaint[key] || '').toLowerCase().includes(filters[key].toLowerCase())
            : true
        );
      });
      setFilteredComplaints(filtered);
    };

    applyFilters();
  }, [filters, complaints]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l'); // 'l' sets the document to landscape orientation
    doc.text('History of Complaints', 20, 10);
    doc.autoTable({
      head: [
        [
          'Problem Details',
          'Raised By',
          'Department',
          'Phone Number',
          'Problem Type',
          'Location',
          'Under Warranty',
          'Steps Taken',
          'Initially Addressed By',
          'Dept Contact Number',
          'Other Info',
          'When Raised',
          'Technician Assigned',
          'Status',
        ],
      ],
      body: filteredComplaints.map((complaint) => [
        complaint.problemDetails,
        complaint.raisedBy,
        complaint.department,
        complaint.phoneNumber,
        complaint.problemType,
        complaint.location,
        complaint.isUnderWarranty ? 'Yes' : 'No',
        complaint.stepsTaken,
        complaint.initialAddressedBy,
        complaint.deptContactPhoneNumber,
        complaint.otherInfo,
        new Date(complaint.createdAt).toLocaleDateString(),
        complaint.assignedTo || 'Not yet assigned',
        complaint.status,
      ]),
      startY: 20,
    });
    doc.save('complaints_history.pdf');
  };
  

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredComplaints);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Complaints');
    XLSX.writeFile(workbook, 'complaints_history.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">History of Complaints</h2>

      {/* Export Buttons */}
      <div className="mb-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={exportToPDF}>
          Export to PDF
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>

      {/* Filter Inputs */}
      <div className="mb-4 grid grid-cols-4 gap-2">
        <input name="problemDetails" placeholder="Problem Details" className="border p-2" onChange={handleFilterChange} />
        <input name="raisedBy" placeholder="Raised By" className="border p-2" onChange={handleFilterChange} />
        <input name="department" placeholder="Department" className="border p-2" onChange={handleFilterChange} />
        <input name="phoneNumber" placeholder="Phone Number" className="border p-2" onChange={handleFilterChange} />
        <input name="problemType" placeholder="Problem Type" className="border p-2" onChange={handleFilterChange} />
        <input name="location" placeholder="Location" className="border p-2" onChange={handleFilterChange} />
        <input name="isUnderWarranty" placeholder="Under Warranty" className="border p-2" onChange={handleFilterChange} />
        <input name="stepsTaken" placeholder="Steps Taken" className="border p-2" onChange={handleFilterChange} />
        <input name="initialAddressedBy" placeholder="Initially Addressed By" className="border p-2" onChange={handleFilterChange} />
        <input name="deptContactPhoneNumber" placeholder="Dept Contact Number" className="border p-2" onChange={handleFilterChange} />
        <input name="otherInfo" placeholder="Other Info" className="border p-2" onChange={handleFilterChange} />
        <input name="createdAt" placeholder="When Raised (YYYY-MM-DD)" className="border p-2" onChange={handleFilterChange} />
        <input name="assignedTo" placeholder="Technician Assigned" className="border p-2" onChange={handleFilterChange} />
        <input name="status" placeholder="Status" className="border p-2" onChange={handleFilterChange} />
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Problem Details</th>
              <th className="px-4 py-2 border text-left">Raised By</th>
              <th className="px-4 py-2 border text-left">Department</th>
              <th className="px-4 py-2 border text-left">Phone Number</th>
              <th className="px-4 py-2 border text-left">Problem Type</th>
              <th className="px-4 py-2 border text-left">Location</th>
              <th className="px-4 py-2 border text-left">Under Warranty</th>
              <th className="px-4 py-2 border text-left">Steps Taken</th>
              <th className="px-4 py-2 border text-left">Initially Addressed By</th>
              <th className="px-4 py-2 border text-left">Dept Contact Number</th>
              <th className="px-4 py-2 border text-left">Other Info</th>
              <th className="px-4 py-2 border text-left">When Raised</th>
              <th className="px-4 py-2 border text-left">Technician Assigned</th>
              <th className="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-4 py-2 border">{complaint.problemDetails}</td>
                <td className="px-4 py-2 border">{complaint.raisedBy}</td>
                <td className="px-4 py-2 border">{complaint.department}</td>
                <td className="px-4 py-2 border">{complaint.phoneNumber}</td>
                <td className="px-4 py-2 border">{complaint.problemType}</td>
                <td className="px-4 py-2 border">{complaint.location}</td>
                <td className="px-4 py-2 border">{complaint.isUnderWarranty ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border">{complaint.stepsTaken}</td>
                <td className="px-4 py-2 border">{complaint.initialAddressedBy}</td>
                <td className="px-4 py-2 border">{complaint.deptContactPhoneNumber}</td>
                <td className="px-4 py-2 border">{complaint.otherInfo}</td>
                <td className="px-4 py-2 border">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{complaint.assignedTo || 'Not yet assigned'}</td>
                <td className="px-4 py-2 border">{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHistory;
