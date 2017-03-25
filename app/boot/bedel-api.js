/*eslint no-extend-native: "off"*/
// Loader responsible for updating api
// FOR DEV ONLY
// NOTE: REMOVE IN FINAL RELEASE

/**
 * Module dependencies
 */
const request = require('request');
const api_package_json = require('bedel-api/package.json');
const chalk = require('chalk');
const { spawn } = require('child_process');
const which = require('which');
const BEDEL_API_OWNER = "Gum-Joe";
const BEDEL_API_REPO = "bedel-api";
const BEDEL_API_USER_AGENT = "bedel-server";
const BEDEL_INSTALL_API = `git://github.com/${BEDEL_API_OWNER}/${BEDEL_API_REPO}`;

// Replace method
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = (args, logger, done) => {
  if (process.env.NODE_ENV === "production" || args["skip_api_update"]) {
    // Dosn't need updating
    logger.debug("Not updating API");
    done();
  } else {
    logger.info("Checking for API updates...");
    logger.info("To skip updating, use the --skip-api-update flag.");
    logger.info("To force updating, use the --force-api-update flag.");
    // Check for updates
    request({
      url: `https://api.github.com/repos/${BEDEL_API_OWNER}/${BEDEL_API_REPO}/commits`,
      headers: {
        "User-Agent": BEDEL_API_USER_AGENT
      }
    }, (err, res, body) => {
      if (err) {
        // Err getting SHA (internal)
        logger.err(err.message);
        logger.err(err.code);
        logger.warn("Could not update API");
        logger.warn("You may need to update it yourself");
        logger.warn(" https://github.com/Gum-Joe/bedel/README.md");
        done();
      } else if (res.statusCode > 300) {
        // Err getting SHA (response)
        logger.err("Failed to complete api update request");
        logger.err(`  Got code ${chalk.cyan(`'${res.statusCode}'`)} from https://api.github.com/repos/${BEDEL_API_OWNER}/${BEDEL_API_REPO}/commits`);
        logger.err(`  Response: ${chalk.cyan(body)}`);
        logger.warn("Could not update API");
        logger.warn("You may need to update it yourself");
        logger.warn(" https://github.com/Gum-Joe/bedel/README.md");
        done();
      } else {
        // Check if update neede
        logger.debug("Got commits from github repo for bedel api");
        logger.debug("Parsing JSON...");
        const commits = JSON.parse(body);
        const currentAPI = commits[0];
        logger.debug("Checking package.json api version...");
        const apiInstalledVersion = api_package_json.gitHead;
        if (currentAPI.sha !== apiInstalledVersion || args["force_api_update"]) {
          // Update
          logger.info("Updates to bedel api required!");
          logger.info(`Current commit SHA: ${chalk.cyan(currentAPI.sha)}`);
          logger.info(`Installed commit SHA: ${chalk.magenta(apiInstalledVersion)}`);
          logger.info("Updating...");
          const npmUpdate = spawn(which.sync("npm"), [
            "install",
            "--save",
            BEDEL_INSTALL_API
          ]);
          npmUpdate.stdout.on("data", (data) => {
            data.toString('utf8')
              .split("\n")
              .forEach((value) => {
                if (value.match(/[a-z]/i)) {
                  logger.info(value);
                }
              });
          });
          npmUpdate.stderr.on("data", (data) => {
            data.toString('utf8').split("npm").forEach((value) => logger.warn("npm" + value.replaceAll("\n", "")));
          });
          npmUpdate.on("exit", (code) => {
            if (code !== 0) {
              logger.err("Error updating bedel api!");
              logger.err(`  Exit code: ${chalk.cyan(code)}`);
              done();
            } else {
              logger.info("Update successful.");
              done();
            }
          });
        } else {
          // Update not needed
          logger.info("No update needed to bedel api.");
          done();
        }
      }
    });
  }
};
