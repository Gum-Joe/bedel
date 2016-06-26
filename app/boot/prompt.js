// Prompt loader for boot
/**
 * Module depedencies
 */
const { Prompt } = require('../util/prompt');

// Export method
module.exports = (args, reject, logger) => {
  // Start the prompt
  if (!args.no_prompt) {
    const prompt = new Prompt('BEDEL>');
    prompt.command('stop', 'Stops the server', (args, rl) => {
      rl.question('Are you sure you want to stop the server? (y/N) ', (answer) => {
        if (answer === 'y' || answer === 'Y') {
          logger.stdout = (msg) => process.stdout.write(msg);
          logger.info('Stopping the server...\n');
          process.exit(0);
        }
      });
    });
  }
};
