const mongoose = require('mongoose');

const Channel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  liveStreamLink: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
    required: true,
  },
  isAllowFree: {
    type: Boolean,
    default: false
  },
  isLive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Channel", Channel);
