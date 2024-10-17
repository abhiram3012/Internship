const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  raisedBy: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  problemType: {
    type: String,
    enum: ['hardware', 'software', 'networking', 'cc cameras', 'other'],
    required: true,
  },
  otherProblem: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    required: true,
  },
  problemDetails: {
    type: String,
    required: true,
  },
  isUnderWarranty: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  stepsTaken: {
    type: String,
    required: true,
  },
  initialAddressedBy: {
    type: String,
    required: true,
  },
  deptContactPhoneNumber: {
    type: String,
    required: true,
  },
  otherInfo: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['raised', 'assigned', 'checked', 'solved'],
    default: 'raised', // Default status when a complaint is created
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician', // Reference to the Technician model
    default: null,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
