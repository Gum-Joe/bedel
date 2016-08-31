'use strict';

// Parser of config
const YAML = require('yamljs');

/**
 * Config loader
 * @param file {String} config file
*/
const loadConfig = (file) => {
  // Parse
  return YAML.load(file);
};
// export
module.exports = {
  loadConfig: loadConfig
};
