const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const EndUser = require('../models/endUserModel'); // Adjust the path as necessary
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

// Create User Route
router.post('/register', async (req, res) => {
  const { username, fullname, department, phoneNumber, emailId } = req.body;
  console.log(username)
  console.log(fullname)
  console.log(department)
  console.log(phoneNumber)
  console.log(emailId)
  try {
    // Check if the user already exists
    const existingUser = await EndUser.findOne({ emailId });
    if (existingUser) {
      console.log("already existing user")
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate a random password
    const password = generateRandomPassword();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new EndUser({
      username,
      fullname,
      department,
      phoneNumber,
      emailId,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();

    // Send email with the new credentials
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: 'Your Account has been Created',
      text: `Hello ${fullname},\n\nYour account has been created successfully!\n\nHere are your credentials:\nUsername: ${username}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'User created, but failed to send email.' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User Route
router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;

  try {
    // Find the user by email
    const user = await EndUser.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).json({id:user.id,emailId:user.emailId,phoneNumber:user.phoneNumber,role:"enduser",department:user.department,username:user.username,accessToken:accessToken})
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all endusers
router.get('/getAll', async (req, res) => {
    try {
      const endusers = await EndUser.find();
      res.status(200).json(endusers);
    } catch (error) {
      console.error('Error fetching endusers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Change Password Route
router.put('/changePassword', async (req, res) => {
  const { emailId, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await EndUser.findOne({ emailId });
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
