'use strict';
// Database connecter
/**
 * Module depedencies
*/
const _connect = require('./connecter');
const chalk = require('chalk');
const Logger  = require('../util/logger');
const mongoose = require('mongoose');
const parser = require('../util/parser');
const vars = require('../util/vars');

/**
 * Vars
*/
const config = parser.loadConfig(vars.CONFIG_FILE);

/**
 * Exported method
 * @param options {Object} Options
*/
const connect = (options) => {
  const logger = new Logger(options);
  let retries = 0;
  _connect(logger, config);
  // Handle errors
  // From: http://mongoosejs.com/docs/index.html
  // Modified to use ES6
  const db = mongoose.connection;
  db.on('error', (err) => {
    if (retries > config.db.max_retries) {
      logger.debug("");
      logger.err("Maximum connection retries exceeded for database!");
      logger.throw(err);
    } else {
      logger.debug("");
      logger.debug(`Retrying connection to db (${retries} of ${config.db.max_retries})...`);
      retries++;
      _connect(logger);
    }
  });
  db.once('open', function() {
    logger.info('Connected to the database.');
  });
};

// Export
module.exports = {
  connect: connect
};
