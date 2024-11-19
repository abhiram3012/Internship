const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
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
        required: [true, "Please add the user email address"],
        unique: [true, "email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Pleasr add the user password"],
    },
    department: {
      type: String,
      required: true
    },
    fullname:{
      type: String,
      required: true
    }
},{
    timestamps: true,
}
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
