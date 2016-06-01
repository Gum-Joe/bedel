'use strict';
// Models for mongoose
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Exports
let lib = module.exports = {};

// User schema
const User = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Compile
lib.User = mongoose.model('users', User);
