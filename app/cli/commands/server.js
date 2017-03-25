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
      [ '--force-api-update', 'Force updating the api' ],
      [ '--no-color',  'Don\'t use colour' ],
      [ '--no-prompt', 'Don\'t use a prompt' ],
      [ '--skip-api-update', 'Skip updating the api' ]
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
