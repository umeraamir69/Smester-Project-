const mongoose = require('mongoose');

const Leagues = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
    required: true,
  }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Leagues", Leagues);
