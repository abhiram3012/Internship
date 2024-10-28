import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [endUsers, setEndUsers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    fullname: '',
    department: '',
    phoneNumber: '',
    emailId: '',
    role: 'End User',
  });

  // Fetch end users and technicians from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endUserResponse = await axios.get('http://localhost:5000/api/enduser/getAll');
        const technicianResponse = await axios.get('http://localhost:5000/api/technician/getAll');
        
        setEndUsers(endUserResponse.data);
        setTechnicians(technicianResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the respective route based on the role
      const endpoint = newUser.role === 'Technician' 
        ? 'http://localhost:5000/api/technician/register' 
        : 'http://localhost:5000/api/enduser/register'; 

      // Make the API call to create the user
      const response = await axios.post(endpoint, newUser);
      console.log(response.data);

      // Update the appropriate state with the new user
      if (newUser.role === 'Technician') {
        setTechnicians([...technicians, newUser]);
      } else {
        setEndUsers([...endUsers, newUser]);
      }

      setShowForm(false);
      setNewUser({ username: '', fullname: '', department: '', phoneNumber: '', emailId: '', role: 'End User' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">End Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Department</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {endUsers.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.fullname}</td>
                <td className="border border-gray-300 p-2">{user.department}</td>
                <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
                <td className="border border-gray-300 p-2">{user.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Technicians</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Department</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.fullname}</td>
                <td className="border border-gray-300 p-2">{user.department}</td>
                <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
                <td className="border border-gray-300 p-2">{user.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={() => setShowForm(true)} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add User
      </button>

      {showForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Create User</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-gray-700">Username</label>
              <input 
                type="text" 
                name="username" 
                value={newUser.username} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Full Name</label>
              <input 
                type="text" 
                name="fullname" 
                value={newUser.fullname} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Department</label>
              <input 
                type="text" 
                name="department" 
                value={newUser.department} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                value={newUser.phoneNumber} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Email ID</label>
              <input 
                type="email" 
                name="emailId" 
                value={newUser.emailId} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Role</label>
              <select 
                name="role" 
                value={newUser.role} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="End User">End User</option>
                <option value="Technician">Technician</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create User
            </button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)} 
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Users;
