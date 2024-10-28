const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
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
},{
    timestamps: true,
}
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
