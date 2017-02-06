// Apps modal
/**
 * Module depedencies
*/
const mongoose = require('mongoose');

// Schema
const App = new mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true}
});

// Compile & export
module.exports = mongoose.model('apps', App);
