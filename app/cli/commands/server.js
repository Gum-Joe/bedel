// Server command
/**
 * Module depedencies
 */
const app = require('../../../app');
const boot = require('../../boot');
const Cli = require('../');

// Export
module.exports = (argv) => {
  const cli = new Cli(
    [
      [ '-p, --port <port>', 'Specifies a port to open the server' ],
      [ '--color',  'Use colour' ],
      [ '--debug', 'Debug logging' ],
      [ '--no-color',  'Don\'t use colour' ],
      [ '--no-prompt', 'Don\'t use a prompt' ]
    ],
    {
      script: 'bedel-server',
      subCommand: true
    },
    argv
  );
  // Parse + run
  const options = cli.parse();
  // Start server
  boot(options, () => {
    app(options);
  });
};
