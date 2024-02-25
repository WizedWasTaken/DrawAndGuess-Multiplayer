const mongoose = require('mongoose');

const snailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Indtast et navn',
  },
  minSpeed: {
    type: Number,
    required: 'Indtast en min. hastighed',
  },
  maxSpeed: {
    type: Number,
    required: 'Indtast en max. hastighed',
  },
  avgSpeed: {
    type: Number,
    default: minSpeed / maxSpeed,
  },
  img: {
    type: String,
    required: 'Indtast et billede',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
