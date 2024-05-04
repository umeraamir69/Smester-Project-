const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    enum: ['standard', 'premium'],
    default: 'standard'
  },
  isSuperUser: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("User", User);
