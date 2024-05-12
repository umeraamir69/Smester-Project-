const mongoose = require('mongoose');

const Game = new mongoose.Schema({
  teamOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  teamTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leagues',
    required: true
  },
  additionalLinks: {
    type: [String], 
    default: [] 
  },
  matchDate: {
    type: Date,
    required: true
  },
  venue:{
    type: "String"
  },
  scoreTeamOne:{
    type:"Number",
    default : 0
  },
  scoreTeamTwo:{
    type:"Number",
    default : 0
  },
  isLive : {
    type: 'Boolean',
    default : false
  }
}, { timestamps: true });

mongoose.models = {}; 

export default mongoose.model("Game", Game);
