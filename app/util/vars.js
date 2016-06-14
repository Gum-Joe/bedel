'use strict';

const path = require('path');

const vars = {
  CONFIG_FILE: 'config/config.yml',
  CACHE_DIR: path.join(process.cwd(), 'tmp', 'cache'),
  DEAFULT_PORT: 8080,
  BCRYPT_SALT_FACTOR: 10
};
module.exports = vars;
