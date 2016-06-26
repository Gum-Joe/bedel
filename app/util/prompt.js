// Prompt
// From http://code.tutsplus.com/tutorials/real-time-chat-with-nodejs-readline-socketio--cms-20953
/**
 * Module dependencies
 */
const readline = require('readline');

/**
 * Help function
 */
const _help = (cmds) => {
  for (let cmd of cmds) {
    console.log(`   /${cmd.name}:   ${cmd.help}`);
  }
};

/**
 * Class
 * @param prompt {String} Prompt to use
 */
class Prompt {
  constructor(prompt) {
    // Commands
    // FORMAT: { name: String, help: String, handle: Function }
    this.commands = [];
    // Prompt
    this.rl = readline.createInterface(process.stdin, process.stdout);

    this.rl.setPrompt(`${prompt} `);
    this.rl.prompt();

    this.rl.on('line', (line) => {
      // Go through each command
      let isFound = false;
      // Help?
      if (line.startsWith(`/help`)) {
        _help(this.commands);
        return;
      }
      // Check commands
      for (let cmd of this.commands) {
        if (line.startsWith(`/${cmd.name}`)) {
          isFound = true;
          // Handle execution
          cmd.handle(line, this.rl);
        }
      }
      // No command?
      if (!isFound) {
        console.log(`Command ${line.split(' ')[0]} not found.`);
      }
    }).on('close', () => {
      console.log('Have a great day!');
      process.exit(0);
    });
    // Hijack console.log function
    const old = console.log;
    console.log = function out(msg) {
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        old(msg);
        this.rl.prompt(true);
    }.bind(this);
  }

  /**
   * Add a command
   * @param cmd {String} Command to add
   * @param help {String} Help string
   * @param handler {Function} Handler of command
   */
  command(cmd, help, handler) {
    this.commands.push({
      name: cmd,
      help: help,
      handle: handler
    });
  }
}

// Export
module.exports = {
  Prompt: Prompt
};
