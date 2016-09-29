// Error handler
/**
 * Module depedencies
*/
const chalk = require('chalk');

// Handlers
/**
 * Catch 404 error and forward to error handler
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
const makeE404 = (logger) => {
  return function (req, res) {
    const err = new Error('404: Not Found');
    err.status = 404;
    logger.prefix = chalk.yellow.bold('E404');
    logger.info(`Got a ${err.status || 500} for ${req.url}`);
    res.status(err.status);
    res.render('error.ejs', {
      message: err.message,
      err: err
    });
  };
};

/**
 * Error Handler
 * @param err {Error} - Error object
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
const makeErrHandle = (oldLogger) => {
  const logger = oldLogger;
  return function (error, req, res) {
    // Reassign
    let err = error;
    if (!err.status) {
      err.status = 500;
    }
    if (err.status > 499) {
      logger.prefix = chalk.red.bold(`E${err.status}`);
    } else if (err.status < 500 && err.status > 399) {
      logger.prefix = chalk.yellow.bold(`E${err.status}`);
    }
    logger.info(`Got a ${err.status || 500} for ${req.url}`);
    logger.prefix = null;
    
    // Send
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      err: err
    });
  };
};

/**
 * Use method
 * @param app {Object} Express app object
 * @param logger {Logger} Logger
*/
module.exports = (app, logger) => {
  app.use(makeE404(logger));
  app.use(makeErrHandle(logger));
};
