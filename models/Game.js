import { type } from 'os';

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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Channel',
    required: true
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leagues',
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  venue:{
    type: String
  },


  posterLink : {
    type : "String",
  },


  additionalLinks: {
    type: String, 
    default: [] 
  },
  additionalHeaderLink : {
    type: String,
  },
  isLive : {
    type: Boolean,
    default : false
  }
}, { timestamps: true });

mongoose.models = {}; 

export default mongoose.model("Game", Game);
