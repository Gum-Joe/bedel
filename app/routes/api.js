// Api routes (/api)
/**
 * Module dependencies
 */
const express = require('express');
const pack = require('../../package');

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
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(403);
    res.json({ error: "You don't appear to be logged in. (403: Forbidden)" });
  }
});

// Export
module.exports = app;
