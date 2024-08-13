const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // Ensure email is unique
  },
  username: { // Add username field
    type: String,
    trim: true,
    required: true,
    unique: true, // Ensure username is unique
  },
  password: { // Add password field
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
