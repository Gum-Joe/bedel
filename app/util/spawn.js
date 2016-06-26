// Spawn function

const { spawn } = require('child_process');
const which = require('which');
const readline      = require('readline');
const proc          = spawn('C:\\Program Files\\nodejs\\npm.cmd', [ '--verbose', 'install', 'buildup' ], {
  env: process.env
});

readline.createInterface({
  input     : proc.stdout,
  terminal  : false
}).on('line', function(line) {
  console.log(line);
});

/**
 * Spawns a given command
 *
 * @param cmd {String} Command to run
 * @param args {Array} Arguments
 * @param callback {Function} Callback
 */
module.exports = (cmd, args, callback) => {
  which(cmd, (err, path) => {
    if (err) {
      throw err;
    }
    // Spawn
    const child = spawn(path, args, {
      env: process.env
    });
    // Fix
    readline.createInterface({
      input     : child.stdout,
      terminal  : false
    }).on('line', callback);
  });
};
