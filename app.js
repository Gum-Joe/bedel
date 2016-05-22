'use strict';
// Main app file
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
*/
const express = require('express');
const http = require('http');
const parser = require('./lib/parser');
const Logger  = require('./lib/logger');
const bodyParser = require('body-parser');
/**
 * Vars
*/
const config = parser.loadConfig();
const PORT = process.env.PORT || config.port || 8080;
const logger = new Logger();
// Init app
const app = express();
// Register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes

// Create server and listen
const server = http.createServer(app);
server.listen(PORT, () => {
  logger.info(`Listenning on port ${PORT}...`);
});
