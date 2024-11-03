import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user); // Access user from Redux store
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditToggle = () => {
    if (isEditing) {
      // Dispatch an action to save the updated user info (if needed)
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert('Password changed successfully');
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 w-full max-w-lg bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Profile</h2>

        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">Name:</span>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="block w-2/3 p-1 border border-gray-300 rounded"
              />
            ) : (
              <span>{user.username}</span>
            )}
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">Email:</span>
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="block w-2/3 p-1 border border-gray-300 rounded"
              />
            ) : (
              <span>{user.emailId}</span>
            )}
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">Phone Number:</span>
            {isEditing ? (
              <input
                type="tel"
                value={editedUser.phoneNumber}
                onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
                className="block w-2/3 p-1 border border-gray-300 rounded"
              />
            ) : (
              <span>{user.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">Role:</span>
            <span>{user.role}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:space-x-4">
          <button
            onClick={handleEditToggle}
            className={`px-6 py-2 text-white rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'}`}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded"
          >
            Change Password
          </button>
        </div>

        {showChangePassword && (
          <div className="mt-6 p-4 border border-gray-300 rounded">
            <div className="mb-4">
              <label className="block text-lg font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="px-6 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setShowChangePassword(false)}
              className="ml-2 px-6 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
