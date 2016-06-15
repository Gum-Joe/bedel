// Api routes (/api)
/**
 * Module dependencies
 */
const express = require('express');
const path = require('path');

// Init
const app = express();

// GET /session/user
app.get('/session/user', (req, res) => {
  res.json(req.user);
});

// Export
module.exports = app;
