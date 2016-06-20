'use strict';

// Parser of config
import YAML from 'yamljs';
import vars from './vars';

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
