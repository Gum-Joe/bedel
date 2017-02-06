// Api routes (/api)
/**
 * Module dependencies
 */
const express = require('express');
const pack = require('../../package');
const { App } = require('../models');
const { readFile } = require('fs');
const BEDEL_APP_JSON_NAME = "bedel.json";

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

// GET /apps/:app
app.get('/apps/:app', (req, res) => {
  // Find app
  App.findOne({name: req.params.app}, (err, app) => {
    if (err || !app) {
      res.status(404);
      res.json({ error: "Couldn't find app or other error." });
    } else {
      const appjson = require(`${app.location}/${BEDEL_APP_JSON_NAME}`);
      readFile(`${app.location}/${appjson.client}`, (err, data) => {
        if (err) {
          res.status(404);
          res.json({ error: "Couldn't read app config" });
        } else {
          res.send(data);
        }
      })
    };
  });
})
// Export
module.exports = app;
