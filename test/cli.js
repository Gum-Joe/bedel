'use strict';
// Tests for cli parser.
const { expect } = require('chai');
const Cli = require('../app/cli');
// Default options
const opts = {
  options: [
    ['-t, --test', 'Test']
  ],
  parseropts: { script: 'cli.js' },
  argv: ['node', 'cli.js', '--test']
};

describe('Cli parser tests', () => {

  it('should check the cli parser has the correct properties', (done) => {
    const cli = new Cli(
      opts.options,
      opts.parseropts,
      opts.argv
    );
    // Checks
    expect(cli.options).to.be.a('array');
    expect(cli.options).to.include(
      { short: '-t', long: '--test', help: 'Test' }
    );
    expect(cli.argv).to.be.a('array');
    expect(cli.argv).to.include(
      opts.argv[2]
    );
    expect(cli.parserOptions).to.be.a('object');
    expect(cli.parserOptions).to.eql(opts.parseropts);
    expect(cli.commands).to.be.a('array');
    expect(cli.commands).to.eql([]);
    expect(cli.usageString).to.be.a('string');
    expect(cli.usageString).to.equal('[options]');
    done();
  });

  it('should check that argv is set correctly if no options object is specified.', (done) => {
    const cli = new Cli(
      opts.options,
      opts.argv
    );
    expect(cli.options).to.be.a('array');
    expect(cli.options).to.include(
      { short: '-t', long: '--test', help: 'Test' }
    );
    expect(cli.parserOptions).to.be.a('object');
    expect(cli.parserOptions).to.not.eql(opts.parseropts);
    expect(cli.parserOptions).to.eql({});
    done();
  });

});
