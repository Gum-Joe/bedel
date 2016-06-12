'use strict';
// Connects to the database
/**
 * Module depedencies
*/
const mongoose = require('mongoose');
const chalk = require('chalk');

/**
 * Initial connection
 * @param loggerOld {Logger} Logger
 * @private
 */
const connect = (loggerOld, config) => {
  let logger = loggerOld;
  logger.prefix = chalk.magenta.bold('DBASE');
  logger.debug(`Connecting to database...`);
  const dbc = config.db;
  const url = process.env.MONGODB_URL || `mongodb://${dbc.url}:${dbc.port}/${config.name}`;
  logger.debug(`Url: ${chalk.green.bold(url)}`);
  mongoose.connect(url);
};

// Export
module.exports = connect;
