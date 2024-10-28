const mongoose = require('mongoose');

const endUserSchema = new mongoose.Schema({
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
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Simple validation for 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Simple email validation
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const EndUser = mongoose.model('EndUser', endUserSchema);

module.exports = EndUser;
