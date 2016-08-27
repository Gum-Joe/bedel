// Notifications modal
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Schema
const Notifications = new mongoose.Schema({
  id: { type: Number, required: true },
  app: { type: String, required: true },
  body: { type: String, required: true },
  icon: String,
  link: String,
  reactLink: String
});

// Compile & export
module.exports = mongoose.model('notifications', Notifications);
