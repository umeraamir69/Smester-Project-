import { type } from 'os';

const mongoose = require('mongoose');

const Package = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    enum: ['USD', 'PKR' , 'GBP' , 'INR'],
    default: 'USD',
    required : true
  },
  ammount :{
    type : Number,
    default : 0,
    required : true
  },
  interval: {
    type: String,
    enum: ['day', 'month' , 'week' , 'year'],
    default: 'month',
    required : true
  },
  interval_count :{
    type : Number,
    default : 1,
    required : true
  },
  priceId :{
    type : String,
  }

}, { timestamps: true });

mongoose.models = {};

export default mongoose.model("Package", Package);
