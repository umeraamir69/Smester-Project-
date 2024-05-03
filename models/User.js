const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: true
  },
  accessLevel: {
    type: String,
    enum: ['standard', 'premium'],
    default: 'standard'
  }
}, { timestamps: true })


mongoose.models = {};

export default mongoose.model("userModel", userSchema);