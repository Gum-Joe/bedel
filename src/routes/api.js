// Api routes (/api)
/**
 * Module dependencies
 */
import express from 'express';
import path from 'path';

// Init
const app = express();

// GET /session/user
app.get('/session/user', (req, res) => {
  res.json(req.user);
});

// Export
module.exports = app;
