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
    // OS
    this.platform = this.parserOptions.platform || os.platform();
    // script name
    this.script = this.parserOptions.script || this.argv[1];
    if (this.platform === 'win32') {
      this.script = this.script.split('\\');
      this.script = this.script[ this.script.length - 1 ];
    } else {
      this.script = this.script.split('/');
      this.script = this.script[ this.script.length - 1 ];
    }
    // Default usage
    this.usageString = '[options]';
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
      let shortLong = opt[0];
      // Arg?
      if (shortLong.includes('<') && shortLong.includes('>')) {
        returnOpt.hasArg = true;
        // Slice
        shortLong = shortLong.split(' <')[0];
      } else if (shortLong.includes('<') || shortLong.includes('>')) {
        throw new SyntaxError(`Unmatched < or > in args config of option '${shortLong}'!`);
      }
      if (shortLong.includes(',')) {
        // Both a short + long options
        const split = shortLong.split(',');
        returnOpt.short = split[0];
        returnOpt.long = split[1].slice(1, split[1].length);
      } else {
        // Only long
        if (/^-[a-zA-Z]$/.test(shortLong)) {
          // Must have a long options with a short options
          throw new SyntaxError(`Short options (-x) must have a long option (--x) to go with them (option: '${shortLong}')!`);
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
        // Check - does it have an argument?
        if (opt.hasArg) {
          if (argv.includes(opt.short)) {
            returnOpts[name] = argv[ argv.indexOf(opt.short) + 1 ];
          } else {
            returnOpts[name] = argv[ argv.indexOf(opt.long) + 1 ];
          }
        } else {
          returnOpts[name] = true;
        }
      } else {
        // Not included
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
    if (this.argv[0] === '--help' || this.argv.length === 0) {
      this.help();
    }
    // Command?
    if (this.commands.length < 1) {
      return this._parse(this.argv, this.options);
    } else {
      // New args array
      const newArgs = this.argv;
      // Get command
      const cmd = this._findCommand();
      // Slice off old args
      for (var i = 0; i < cmd.index + 1; i++) {
        newArgs.shift();
      }
      // Get command object
      let co;
      let cmdObject;
      for (co of this.commands) {
        if (co.name === cmd.cmd) {
          cmdObject = co;
        }
      }
      // Handle
      cmdObject.handle(newArgs);
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
    if (this.usageString) {
      console.log(`\n ${this.script} ${this.usageString}`);
    } else {
      console.log(`\n ${this.script}`);
    }
    // Get max length for spacing
    const tab_space = 5;
    const tab = this._maxOptLength() + tab_space;

    // Go through commands
    // FORMAT: <command>  <description>
    if (this.commands.length > 0) {
      console.log('\n   Commands:');
      let c;
      for (c of this.commands) {
        // Generate tab
        let tmpTab = '';
        for (let i = c.name.length; i < tab; i++) {
          tmpTab += ' ';
        }
        // Log
        console.log(`       ${c.name}${tmpTab}${c.help}`);
      }
    }

    // Go through options
    // FORMAT: <option> <help>
    if (this.options.length > 0) {
      console.log('\n   Options:');
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
        console.log(`       ${stringToShow}${tmpTab}${h.help}`);
      }
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
   * @param help {String} - Description of the command
   * @param handler {Function} - Handler with param {options {Object}}
   */
   command(cmd, help, handler) {
     this.commands.push({
       name: cmd,
       help: help,
       handle: handler
     });
   }

   /**
    * Add usage
    *
    * @param usage {String} - Usage string
    */
  usage(usage) {
    this.usageString = usage;
  }

}

// Export
module.exports = Cli;
