const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Technician = require('../models/technicianModel'); // Adjust the path as necessary
const router = express.Router();

// Function to generate a random password
const generateRandomPassword = () => {
  const length = 10; // Desired length of the password
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or application-specific password
  },
});

// Route to create a new technician
router.post('/register', async (req, res) => {
  const { username, fullname, department, phoneNumber, emailId, skills } = req.body;

  try {
    // Check if the technician already exists
    const existingTechnician = await Technician.findOne({ username });
    if (existingTechnician) {
      return res.status(400).json({ message: 'Technician already exists' });
    }

    // Generate a random password
    const password = generateRandomPassword();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new technician
    const technician = new Technician({
      username,
      fullname,
      department,
      phoneNumber,
      emailId,
      skills,
      password: hashedPassword, // Store the hashed password
    });

    await technician.save();

    // Send email with the new credentials
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: 'Your Technician Account has been Created',
      text: `Hello ${fullname},\n\nYour technician account has been created successfully!\n\nHere are your credentials:\nUsername: ${username}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Technician created, but failed to send email.' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: 'Technician created successfully' });
  } catch (error) {
    console.error('Error creating technician:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to log in a technician
router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;

  try {
    // Find the technician by username
    const technician = await Technician.findOne({ emailId });
    if (!technician) {
      console.log("fvihji")
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, technician.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const accessToken = jwt.sign({ id: technician._id, username: technician.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h', // Token expiration time
    });
    res.status(200).json({id:technician.id, phoneNumber:technician.phoneNumber,email:technician.emailId, role:"technician",username:technician.username,accessToken:accessToken})
  } catch (error) {
    console.error('Error logging in technician:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all technicians
router.get('/getAll', async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (error) {
    console.error('Error fetching technicians:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Change Password Route
router.put('/changePassword', async (req, res) => {
  const { emailId, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await Technician.findOne({ emailId });
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
