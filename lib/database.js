'use strict';
// Database connecter
/**
 * Module depedencies
*/
const chalk = require('chalk');
const Logger  = require('./logger');
const mongoose = require('mongoose');
const parser = require('./parser');
const vars = require('./vars');

/**
 * Vars
*/
const config = parser.loadConfig(vars.CONFIG_FILE);

/**
 * Initial connection
 * @param logger {Logger} Logger
 */
const _connect = (logger) => {
  logger.prefix = chalk.magenta.bold('DBASE');
  logger.debug(`Connecting to database...`);
  const dbc = config.db;
  const url = process.env.MONGODB_URL || `mongodb://${dbc.url}:${dbc.port}/${config.name}`;
  logger.debug(`Url: ${chalk.green.bold(url)}`);
  mongoose.connect(url);
};

/**
 * Exported method
 * @param options {Object} Options
*/
const connect = (options) => {
  const logger = new Logger(options);
  let retries = 0;
  _connect(logger);
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
