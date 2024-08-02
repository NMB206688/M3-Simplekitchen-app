const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true, // Ensure required fields are defined
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
