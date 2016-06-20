'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init
// Api routes (/api)
/**
 * Module dependencies
 */
var app = (0, _express2.default)();

// GET /session/user
app.get('/session/user', function (req, res) {
  res.json(req.user);
});

// Export
module.exports = app;