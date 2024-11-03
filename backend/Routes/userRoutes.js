const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');



const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// Change Password Route
router.put('/changePassword', async (req, res) => {
    const { emailId, currentPassword, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await Admin.findOne({ emailId });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the current password is correct
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: 'Incorrect current password.' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;