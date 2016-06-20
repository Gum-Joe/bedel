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
      [ '--color',  'Use colour' ],
      [ '--debug', 'Debug logging' ],
      [ '--no-color',  'Don\'t use colour' ]
    ],
    {
      script: 'bedel-server'
    },
    argv
  );
  // Parse + run
  const options = cli.parse();
  app(options);
};
