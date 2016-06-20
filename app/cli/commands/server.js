// Server command
/**
 * Module depedencies
 */
const app = require('../../../app');
const Cli = require('../');

// Export
module.exports = (argv) => {
  const cli = new Cli(
    [
      [ '-p, --port <port>', 'Specifies a port to open the server' ],
      [ '--color',  'Use colour' ],
      [ '--debug', 'Debug logging' ],
      [ '--no-color',  'Don\'t use colour' ]
    ],
    {
      script: 'bedel-server',
      subCommand: true
    },
    argv
  );
  // Parse + run
  app(
    cli.parse()
  );
};
