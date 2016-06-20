'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vars = {
  CONFIG_FILE: 'config/config.yml',
  CACHE_DIR: _path2.default.join(process.cwd(), 'tmp', 'cache'),
  DEAFULT_PORT: 8080,
  BCRYPT_SALT_FACTOR: 10
};
module.exports = vars;