'use strict';
// User model
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Schema
const User = new mongoose.Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, require: true }
});

// Compile & export
module.exports = mongoose.model('users', User);
