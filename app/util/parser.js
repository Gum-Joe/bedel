'use strict';

// Parser of config

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _vars = require('./vars');

var _vars2 = _interopRequireDefault(_vars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Config loader
 * @param file {String} config file
*/
var loadConfig = function loadConfig(file) {
  // Parse
  return _yamljs2.default.load(file);
};
// export
module.exports = {
  loadConfig: loadConfig
};