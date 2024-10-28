const mongoose = require('mongoose');

// Define the Technician schema
const technicianSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [String], // Array of strings to hold multiple skills
    required: true,
  },
  password: {
    type: String,
  }
});

// Create the Technician model
const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;
