// Application loader
const { App } = require('../models');
const Logger  = require('../util/logger');
const { join } = require('path');

module.exports = (api, logger) => {
  // Fix logger prefix clashes
  delete logger.prefix;
  logger.debug("Loading apps...");
  App.find({}, (err, apps) => {
    if (err) {
      logger.throw(err);
    } else if (!apps || apps.length === 0) {
      logger.err("No apps installed!");
    } else {
      apps.forEach(function(app) {
        let appJson;
        logger.debug(`Loading app ${app.name}...`);
        logger.debug(`Location: ${app.location}`);
        try {
          appJson = require(join(app.location, "bedel.json"));
        } catch (err) {
          logger.warn(`App "${app.name}"'s bedel.json could bot be loaded. Please check the file exists and is not corrupted. (${err.code})'`);
          logger.warn(` Location: ${app.location}`);
          logger.warn(` Error message: ${err.message}`);
        }

        try {
          require(join(app.location, appJson.server))(api, new Logger(logger.options));
        } catch (err) {
          logger.warn(`App "${app.name}"'s server entry could not be loaded. Please check the file exists and is not corrupted. (${err.code})'`);
          logger.warn(` Location: ${app.location}`);
          logger.warn(` File: ${appJson.server}`);
          logger.warn(` Error message: ${err.message}`);
        }
      });
    }
  });
};
