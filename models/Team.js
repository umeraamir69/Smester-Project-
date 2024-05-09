const mongoose = require('mongoose');

const Team = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
    required: true,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leagues',
    required: true
  }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Team", Team);
