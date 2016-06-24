'use strict';
// Tests for cli parser.
const { expect } = require('chai');
const Cli = require('../app/cli');
// Default options
const opts = {
  options: [
    ['-t, --test', 'Test'],
    ['r, --real', 'Real']
  ],
  parseropts: { script: 'cli.js' },
  argv: ['node', 'cli.js', '--test']
};

describe('Cli parser tests', () => {

  describe('constructor()', () => {
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

    it('should check that cli.script is set correctly on a windows system', (done) => {
      const cli = new Cli(
        opts.options,
        { script: 'C:\\bedel\\cli.js', platform: 'win32' },
        opts.argv
      );
      expect(cli.script).to.equal('cli.js');
      done();
    });

    it('should check that cli.script is set correctly on a non-windows system', (done) => {
      const cli = new Cli(
        opts.options,
        { script: '/bedel/cli.js',  platform: 'Linux' },
        opts.argv
      );
      expect(cli.script).to.equal('cli.js');
      done();
    });
  });

  describe('_findCommand()', () => {
    it('should find the correct command to run', (done) => {
      const cli = new Cli(
        opts.options,
        opts.parseropts,
        ['node', 'cli.js', 'test']
      );
      // Add
      cli.command('test', 'Test', () => {});
      const result = cli._findCommand();
      expect(result).to.be.a('object');
      expect(result).to.eql({
        cmd: 'test',
        index: 0
      });
      done();
    });
  });

  describe('_genoptions()', () => {
    it('should generate our options when we run cli._genoptions()', (done) => {
      expect(
        Cli.prototype._genoptions(opts.options)
      ).to.include(
        { short: '-t', long: '--test', help: 'Test' }
      );
      done();
    });

    it('should return a normal set of options when we pass in a set of options with no args', (done) => {
      const result = Cli.prototype._genoptions([['-t, --test', 'Help']]);
      expect(result[0]).to.have.property('short', '-t');
      expect(result[0]).to.have.property('long', '--test');
      expect(result[0]).to.have.property('help', 'Help');
      expect(result[0]).to.not.have.property('hasArg');
      done();
    });

    it('should return an options with no \'short\' property', (done) => {
      const result = Cli.prototype._genoptions([['--test', 'Help']]);
      expect(result[0]).to.have.property('short', null);
      expect(result[0]).to.have.property('long', '--test');
      expect(result[0]).to.have.property('help', 'Help');
      expect(result[0]).to.not.have.property('hasArg');
      done();
    });

    it('should check that options has property \'hasArg\' set to true if option has an argument', (done) => {
      const result = Cli.prototype._genoptions([['-b, --two <arg>', 'Test with arg']]);
      expect(result).to.include(
        { short: '-b', long: '--two', help: 'Test with arg', hasArg: true }
      );
      expect(result[0]).to.have.property('hasArg', true);
      done();
    });

    it('should throw a syntax error when we only have a < and no >', (done) => {
      expect( () => {
        Cli.prototype._genoptions([
          [ '-s, --syntax <error', 'test' ]
        ]);
      }).to.throw(SyntaxError, `Unmatched < or > in args config of option '-s, --syntax <error'!`);
      done();
    });

    it('should throw a syntax error when we only have a short option and no long one', (done) => {
      expect( () => {
        Cli.prototype._genoptions([
          [ '-s', 'syntax error' ]
        ]);
      }).to.throw(SyntaxError, `Short options (-x) must have a long option (--x) to go with them (option: '-s')!`);
      done();
    });
  });

  describe('_maxOptLength()', () => {
    it('should get the maximum option\'s length when we give a long & short arg as cli.options', (done) => {
      const cli = new Cli(
        opts.options,
        opts.parseropts,
        opts.argv
      );
      const result = cli._maxOptLength();
      expect(result).to.be.a('number');
      expect(result).to.equal(10);
      done();
    });
    it('should get the maximum option\'s length when we give just a long arg as cli.options', (done) => {
      const cli = new Cli(
        [['--test', 'Test']],
        opts.parseropts,
        opts.argv
      );
      const result = cli._maxOptLength();
      expect(result).to.be.a('number');
      expect(result).to.equal(6);
      done();
    });
  });

  describe('_parse()', () => {
    it('shoukd return the object { test: true, real: false }', (done) => {
      const result = Cli.prototype._parse(
        opts.argv,
        Cli.prototype._genoptions(opts.options)
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: true,
        real: false
      });
      done();
    });

    it('should make sure [ --test <arg> ] comes out as { test: "<arg>" }', (done) => {
      const arg = 'test';
      const result = Cli.prototype._parse(
        Array.concat(opts.argv, [ arg ]),
        Cli.prototype._genoptions([
          ['-t, --test <arg>', 'Test']
        ])
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: arg
      });
      done();
    });

    it('shoukd parse a small option (-t)', (done) => {
      const result = Cli.prototype._parse(
        ['node', 'cli.js', '-t'],
        Cli.prototype._genoptions(opts.options)
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: true,
        real: false
      });
      done();
    });

    it('shoukd parse a long option (--test)', (done) => {
      const result = Cli.prototype._parse(
        ['node', 'cli.js', '--test'],
        Cli.prototype._genoptions(opts.options)
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: true,
        real: false
      });
      done();
    });

    it('should parse a short option with a arg (-t <arg>)', (done) => {
      const arg = 'test';
      const result = Cli.prototype._parse(
        ['node', 'cli.js', '-t', arg],
        Cli.prototype._genoptions([
          ['-t, --test <arg>', 'Test']
        ])
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: arg
      });
      done();
    });

    it('should parse a long option with a arg (--test <arg>)', (done) => {
      const arg = 'test';
      const result = Cli.prototype._parse(
        ['node', 'cli.js', '--test', arg],
        Cli.prototype._genoptions([
          ['-t, --test <arg>', 'Test']
        ])
      );
      expect(result).to.be.a('object');
      expect(result).to.eql({
        test: arg
      });
      done();
    });
  });

  describe('command()', () => {
    it('should add a command when ran', (done) => {
      const cli = new Cli(
        opts.options,
        opts.parseropts,
        opts.argv
      );
      cli.command('test', 'Test', () => {});
      expect(cli.commands[0]).to.have.property('name', 'test');
      expect(cli.commands[0]).to.have.property('help', 'Test');
      expect(cli.commands[0]).to.have.property('handle');
      expect(cli.commands[0].handle).to.be.a('function');
      done();
    });
  });

  describe('usage()', () => {
    it('should set the usage when ran', (done) => {
      const cli = new Cli(
        opts.options,
        opts.parseropts,
        opts.argv
      );
      cli.usage('[test]');
      expect(cli.usageString).to.be.a('string');
      expect(cli.usageString).to.equal('[test]');
      done();
    });
  });

});
