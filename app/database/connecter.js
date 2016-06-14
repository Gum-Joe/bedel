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
  logger.debug(`Connecting to the database...`);
  if (mongoose.connection.readyState <= 0) {
    const dbc = config.db;
    const url = process.env.MONGODB_URL || `mongodb://${dbc.url}:${dbc.port}/${config.name}`;
    logger.debug(`Url: ${chalk.green.bold(url)}`);
    mongoose.connect(url);
  } else {
    logger.info('Already connected to database.');
  }
};

// Export
module.exports = connect;
