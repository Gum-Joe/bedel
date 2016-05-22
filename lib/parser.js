'use strict';

// Parser of config
const YAML = require('yamljs');
const vars = require('./vars');
// Config loader
const loadConfig = () => {
  // Parse
  return YAML.load(vars.CONFIG_FILE);
};
// export
module.exports = {
  loadConfig: loadConfig
};
