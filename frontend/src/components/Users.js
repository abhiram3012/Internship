import React, { useState } from 'react';

function Users() {
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'john@example.com', role: 'End User' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Technician' },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'End User' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, newUser]);
    setShowForm(false);
    setNewUser({ name: '', email: '', role: 'End User' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
                name="name" 
                value={newUser.name} 
                onChange={handleInputChange} 
                className="w-full p-2 border border-gray-300 rounded"
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={newUser.email} 
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
