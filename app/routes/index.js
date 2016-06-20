'use strict';

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Index of routes

module.exports = {
    index: _main2.default,
    api: _api2.default
};