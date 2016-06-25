// Api routes (/api)
/**
 * Module dependencies
 */
const express = require('express');
const pack = require('../../package');
const path = require('path');

// Init
const app = express();

// GET /info/version
app.get('/info/version', function(req, res) {
  res.json({
    version: pack.version
  });
});

// GET /session/user
app.get('/session/user', (req, res) => {
  res.json(req.user || { error: "You don't appear to be logged in." });
});

// Export
module.exports = app;
