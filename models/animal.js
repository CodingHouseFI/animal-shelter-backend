'use strict';

var Mongoose = require('mongoose');

var animalSchema = Mongoose.Schema({
  name: { type: String, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  kind: { type: String, required: false },
  species: { type: String, required: false },
  isAvailable: { type: Boolean, required: false, default: true },
  description: String,
  photo: String
});

var Animal = Mongoose.model('Animal', animalSchema);
module.exports = Animal;
