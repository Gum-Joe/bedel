// Api routes (/api)
/**
 * Module dependencies
 */
const express = require('express');

// Init
const app = express();

app.get('/session/user', (req, res) => {
  res.json(req.user);
});

// Export
module.exports = app;
