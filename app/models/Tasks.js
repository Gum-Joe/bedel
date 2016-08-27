// Notifications modal
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Schema
const Tasks = new mongoose.Schema({
  id: { type: Number, required: true },
  app: { type: String, required: true },
  percentage: { type: Number, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  complete: { type: Boolean, required: true }
});

// Compile & export
module.exports = mongoose.model('tasks', Tasks);
