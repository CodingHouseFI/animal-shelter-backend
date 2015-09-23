'use strict';

var Mongoose = require('mongoose');

var clientSchema = Mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },  
  pets: [{ type: Mongoose.Schema.ObjectId, ref: 'Animal', unique: true}]
});

var Client = Mongoose.model('Client', clientSchema);
module.exports = Client;
