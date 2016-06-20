'use strict';

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Index of cli parser
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
 */


/**
 * Class
 * @param cli {Object} - Options to look for
 * @param options {Object} - Options for parser
 * @param argv {Array} - Array of cli args
 * @class Cli
 */

var Cli = function () {
  function Cli(cli, options, argv) {
    _classCallCheck(this, Cli);

    this.options = this._genoptions(cli);
    // Any options?
    if (Array.isArray(options)) {
      this.argv = Array.concat(options);
      this.parserOptions = {};
    } else {
      this.argv = Array.concat(argv);
      this.parserOptions = options;
    }
    this.commands = [];
    // script name
    this.script = this.parserOptions.script || this.argv[1];
    if (_os2.default.platform() === 'win32') {
      this.script = this.script.split('\\');
      this.script = this.script[this.script.length - 1];
    } else {
      this.script = this.script.split('/');
      this.script = this.script[this.script.length - 1];
    }
    // Slice off the first two cli args if not sub-command
    if (!this.parserOptions.subCommand) {
      this.argv.shift();
      this.argv.shift();
    }
  }

  /**
   * Generate our options object
   *
   * @param options {Array} Array of options
   * @return Array
   * @private
   */


  Cli.prototype._genoptions = function _genoptions(options) {
    // Our options (return)
    var opts = [];
    // Loop and make
    var opt = void 0;
    for (var _iterator = options, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      if (_isArray) {
        if (_i >= _iterator.length) break;
        opt = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        opt = _i.value;
      }

      var returnOpt = {};
      // Slice up options
      var shortLong = opt[0];
      if (shortLong.includes(',')) {
        // Both a short + long options
        var split = shortLong.split(',');
        returnOpt.short = split[0];
        returnOpt.long = split[1].slice(1, split[1].length);
      } else {
        // Only long
        if (/^-[a-zA-Z]$/.test(shortLong)) {
          // Must have a long options with a short options
          throw new SyntaxError('Short options (-x) must have a long options (--x) to go with them (option: ' + shortLong + ')!');
        } else {
          returnOpt.short = null;
          returnOpt.long = shortLong;
        }
      }
      // Add help
      returnOpt.help = opt[1];
      // END OF LOOP
      opts.push(returnOpt);
    }
    // Return
    return opts;
  };

  /**
   * Parses options in an array
   *
   * @param args {Array} Args
   * @param options {Object} Options to look for
   * @return Object
   * @private
   */


  Cli.prototype._parse = function _parse(argv, options) {
    // Return
    var returnOpts = {};
    // Go through each option
    // And check if it is in argv
    var opt = void 0;
    for (var _iterator2 = options, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        opt = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        opt = _i2.value;
      }

      // Used as name
      var name = opt.long.slice(2);
      name = name.replace(/-/g, '_');
      // Check if it is in args
      if (argv.includes(opt.short) || argv.includes(opt.long)) {
        returnOpts[name] = true;
      } else {
        returnOpts[name] = false;
      }
    }

    return returnOpts;
  };

  /**
   * Parses options
   *
   * @return Object
   */


  Cli.prototype.parse = function parse() {
    // Check for help
    if (this.argv.includes('--help')) {
      this.help();
    }
    // Command?
    if (this.commands.length < 1) {
      return this._parse(this.argv, this.options);
    } else {
      // Intial options
      // const inital = this._parse(this.argv, this.options);
      // New args array
      var newArgs = this.argv;
      // Get command
      var cmd = this._findCommand();
      // Slice off old args
      for (var i = 0; i < cmd.index + 1; i++) {
        newArgs.shift();
      }
      // Get command object for usage
      var co = void 0;
      var cmdObject = void 0;
      for (var _iterator3 = this.commands, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          co = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          co = _i3.value;
        }

        if (co.name === cmd.cmd) {
          cmdObject = co;
        }
      }
      //console.log(newArgs);
      // Recreate this class
      var cmdClass = new Cli(cmdObject.opts, {
        script: this.script + '-' + cmd.cmd,
        subCommand: true
      }, newArgs);
      // Modify
      if (cmdObject.modify) {
        cmdObject.modify(cmdClass);
      }
      // Handle
      cmdObject.handle(cmdClass.parse());
    }
  };

  /**
   * Find the command to run
   *
   * @return String
   * @private
   */


  Cli.prototype._findCommand = function _findCommand() {
    // Loop through
    var c = void 0;
    for (var _iterator4 = this.argv, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        c = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        c = _i4.value;
      }

      if (!c.startsWith('--')) {
        return {
          cmd: c,
          index: this.argv.indexOf(c)
        };
      }
    }
  };

  /**
   * Display help
   */


  Cli.prototype.help = function help() {
    // Header
    console.log('\n ' + this.script);
    // Get max length for spacing
    var tab_space = 5;
    var tab = this._maxOptLength() + tab_space;
    // Go through
    var h = void 0;
    for (var _iterator5 = this.options, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        h = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        h = _i5.value;
      }

      var stringToShow = void 0;
      // What should be shown?
      if (h.short) {
        stringToShow = h.short + ', ' + h.long;
      } else {
        stringToShow = '' + h.long;
      }
      // Generate tab
      var tmpTab = '';
      for (var i = stringToShow.length; i < tab; i++) {
        tmpTab += ' ';
      }
      // Log
      console.log('   ' + stringToShow + tmpTab + h.help);
    }
    // Exit
    process.exit(0);
  };

  /**
   * Get max length of one options
   *
   * @return Number
   * @private
   */


  Cli.prototype._maxOptLength = function _maxOptLength() {
    var i = void 0;
    var length = 0;

    for (var _iterator6 = this.options, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        i = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        i = _i6.value;
      }

      if ((i.short + ', ' + i.long).length > length && i.short) {
        length = (i.short + ', ' + i.long).length;
      } else if (('' + i.long).length > length) {
        length = ('' + i.long).length;
      }
    }
    return length;
  };

  /**
   * Add a command
   *
   * @param cmd {String} - Command to look for
   * @param opts {Array} - Array of options
   * @param handler {Function} - Handler with param {options {Object}}
   * @param modifyler {Function} - Modify the cli class for the command with param {cli {Cli}}
   */


  Cli.prototype.command = function command(cmd, opts, handler, modifyer) {
    this.commands.push({
      name: cmd,
      opts: opts,
      handle: handler,
      modify: modifyer || null
    });
  };

  return Cli;
}();

// Export


module.exports = Cli;