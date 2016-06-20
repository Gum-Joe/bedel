'use strict';
// User model
/**
 * Module depedencies
*/

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Schema
var User = new _mongoose2.default.Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, require: true }
});

// Compile & export
module.exports = _mongoose2.default.model('users', User);