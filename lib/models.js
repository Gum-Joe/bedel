'use strict';
// Models for mongoose
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Exports
let lib = module.exports = {};
let redux = {};

// User schema
const User = new mongoose.Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Compile
lib.User = mongoose.model('users', User);
