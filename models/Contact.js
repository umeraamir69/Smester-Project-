const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  solved: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });


mongoose.models = {}; 
export default mongoose.model("Contact", Contact);