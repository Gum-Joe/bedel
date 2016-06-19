// Index of cli parser
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
 */
const os = require('os');

/**
 * Class
 * @param cli {Object} - Options to look for
 * @param options {Object} - Options for parser
 * @param argv {Array} - Array of cli args
 * @class Cli
 */
class Cli {

  constructor(cli, options, argv) {
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
    if (os.platform() === 'win32') {
      this.script = this.script.split('\\');
      this.script = this.script[ this.script.length - 1 ];
    } else {
      this.script = this.script.split('/');
      this.script = this.script[ this.script.length - 1 ];
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
  _genoptions(options) {
    // Our options (return)
    let opts = [];
    // Loop and make
    let opt;
    for (opt of options) {
      const returnOpt = {};
      // Slice up options
      const shortLong = opt[0];
      if (shortLong.includes(',')) {
        // Both a short + long options
        const split = shortLong.split(',');
        returnOpt.short = split[0];
        returnOpt.long = split[1].slice(1, split[1].length);
      } else {
        // Only long
        if (/^-[a-zA-Z]$/.test(shortLong)) {
          // Must have a long options with a short options
          throw new SyntaxError(`Short options (-x) must have a long options (--x) to go with them (option: ${shortLong})!`);
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
  }

  /**
   * Parses options in an array
   *
   * @param args {Array} Args
   * @param options {Object} Options to look for
   * @return Object
   * @private
   */
  _parse(argv, options) {
    // Return
    const returnOpts = {};
    // Go through each option
    // And check if it is in argv
    let opt;
    for (opt of options) {
      // Used as name
      let name = opt.long.slice(2);
      name = name.replace(/-/g, '_');
      // Check if it is in args
      if (argv.includes(opt.short) || argv.includes(opt.long)) {
        returnOpts[name] = true;
      } else {
        returnOpts[name] = false;
      }
    }

    return returnOpts;
  }

  /**
   * Parses options
   *
   * @return Object
   */
  parse() {
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
      const newArgs = this.argv;
      // Get command
      const cmd = this._findCommand();
      // Slice off old args
      for (var i = 0; i < cmd.index + 1; i++) {
        newArgs.shift();
      }
      // Get command object for usage
      let co;
      let cmdObject;
      for (co of this.commands) {
        if (co.name === cmd.cmd) {
          cmdObject = co;
        }
      }
      //console.log(newArgs);
      // Recreate this class
      const cmdClass = new Cli(
        cmdObject.opts,
        {
          script: `${this.script}-${cmd.cmd}`,
          subCommand: true
        },
        newArgs
      );
      // Modify
      if (cmdObject.modify) {
        cmdObject.modify(cmdClass);
      }
      // Handle
      cmdObject.handle(
        cmdClass.parse()
      );
    }
  }

  /**
   * Find the command to run
   *
   * @return String
   * @private
   */
  _findCommand() {
    // Loop through
    let c;
    for (c of this.argv) {
      if (!c.startsWith('--')) {
        return {
          cmd: c,
          index: this.argv.indexOf(c)
        };
      }
    }
  }

  /**
   * Display help
   */
  help() {
    // Header
    console.log(`\n ${this.script}`);
    // Get max length for spacing
    const tab_space = 5;
    const tab = this._maxOptLength() + tab_space;
    // Go through
    let h;
    for (h of this.options) {
      let stringToShow;
      // What should be shown?
      if (h.short) {
        stringToShow = `${h.short}, ${h.long}`;
      } else {
        stringToShow = `${h.long}`;
      }
      // Generate tab
      let tmpTab = '';
      for (let i = stringToShow.length; i < tab; i++) {
        tmpTab += ' ';
      }
      // Log
      console.log(`   ${stringToShow}${tmpTab}${h.help}`);
    }
    // Exit
    process.exit(0);
  }

  /**
   * Get max length of one options
   *
   * @return Number
   * @private
   */
  _maxOptLength() {
    let i;
    let length = 0;

    for (i of this.options) {
      if (`${i.short}, ${i.long}`.length > length && i.short) {
        length = `${i.short}, ${i.long}`.length;
      } else if (`${i.long}`.length > length) {
        length = `${i.long}`.length;
      }
    }
    return length;

  }

  /**
   * Add a command
   *
   * @param cmd {String} - Command to look for
   * @param opts {Array} - Array of options
   * @param handler {Function} - Handler with param {options {Object}}
   * @param modifyler {Function} - Modify the cli class for the command with param {cli {Cli}}
   */
   command(cmd, opts, handler, modifyer) {
     this.commands.push({
       name: cmd,
       opts: opts,
       handle: handler,
       modify: modifyer || null
     });
   }

}

// Export
module.exports = Cli;
