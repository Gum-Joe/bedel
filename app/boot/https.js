/**
 * Creates certificates
 * for https
 * if there are none
 */

const fs = require('fs');
const pem = require('pem');

module.exports = (args, logger, done) => {
  logger.debug("Checking HTTPS...");
  try {
    fs.accessSync('private/https-key.pem', fs.constants.F_OK);
  } catch (err) {
    if (err && err.code !== "ENOENT") {
      // Some other error
      logger.throw(err);
      done();
    } else if (err.code === "ENOENT") {
      // Create certs
      logger.info("Generating HTTPS certificates...");
      pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
        if (err) {
          logger.throw(err);
        }
      });
    } else {
      // File exists
      logger.debug("HTTPS certificates exist");
      done();
    }
  } finally {
    done();
  }

};
