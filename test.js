'use strict';

const path = require('path');

const test = require('tape');
const execFileSubcommand = require('.');

test('execFileSubcommand()', t => {
  t.plan(16);

  t.equal(execFileSubcommand.name, 'execFileSubcommand', 'should have a function name.');

  execFileSubcommand('npm', 'bin', (...args) => {
    t.deepEqual(args, [null, path.resolve('node_modules/.bin') + '\n', ''], 'should run subcommand.');
  });

  execFileSubcommand('npm', 'view', ['n@1.0.0', 'version'], (...args) => {
    t.deepEqual(args, [null, '1.0.0\n', ''], 'should run subcommand with additional arguments.');
  });

  execFileSubcommand('npm', 'bin', null, {}, (...args) => {
    t.deepEqual(
      args,
      [null, path.resolve('node_modules/.bin') + '\n', ''],
      'should work even if `args` is null.'
    );
  });

  execFileSubcommand('npm', 'bin', {encoding: 'base64'}, (...args) => {
    t.deepEqual(
      args,
      [null, new Buffer(path.resolve('node_modules/.bin') + '\n').toString('base64'), ''],
      'should run subcommand with child_process#execFile options.'
    );
  });

  execFileSubcommand('npm', 'view', ['n@1.0.0', 'version'], null, (...args) => {
    t.deepEqual(args, [null, '1.0.0\n', ''], 'should work even if the option is null.');
  });

  execFileSubcommand('npm', 'view', ['n@1.0.0', 'version'], {encoding: 'base64'}, (...args) => {
    t.deepEqual(
      args,
      [null, new Buffer('1.0.0\n').toString('base64'), ''],
      'should run subcommand with additional arguments and options.'
    );
  });

  execFileSubcommand('npm', 'bin', null, null, (...args) => {
    t.deepEqual(
      args,
      [null, path.resolve('node_modules/.bin') + '\n', ''],
      'should work even if both `args` and `options` are null.'
    );
  });

  t.throws(
    () => execFileSubcommand(1, 'foo', t.fail),
    /TypeError.*1 is not a string\. Expected a filename of the program to run\./,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    () => execFileSubcommand('', 'foo', t.fail),
    /Error.*Expected a filename of the program to run, but received an empty string\./,
    'should throw an error when the first argument is an empty string.'
  );

  t.throws(
    () => execFileSubcommand('foo', true, t.fail),
    /TypeError.*true is not a string\. Expected one of the `foo` subcommands\./,
    'should throw a type error when the second argument is not a string.'
  );

  t.throws(
    () => execFileSubcommand('foo', '', t.fail),
    /Error.*Expected one of the `foo` subcommands, but received an empty string\./,
    'should throw an error when the second argument is an empty string.'
  );

  t.throws(
    () => execFileSubcommand('foo', 'bar', false, {}, t.fail),
    /TypeError.*false is not an array\. Expected a list of arguments to be passed to `foo bar` command\./,
    'should throw a type error when `args` is neither an array, undefined nor null.'
  );

  t.throws(
    () => execFileSubcommand('foo', 'bar', ['baz', 'qux'], undefined, 1),
    /TypeError.*1 is not a function\. .*called after version check of `foo bar baz qux` command\./,
    'should throw a type error when it takes 5 arguments but the last one is not a function.'
  );

  t.throws(
    () => execFileSubcommand('foo', 'bar', ['baz'], 'qux'),
    /TypeError.*qux is not a function\. .*called after version check of `foo bar baz` command\./,
    'should throw a type error when it takes 4 arguments but the last one is not a function.'
  );

  t.throws(
    () => execFileSubcommand('foo', 'bar', null),
    /TypeError.*null is not a function\. .*called after version check of `foo bar` command\./,
    'should throw a type error when it takes 3 arguments but the last one is not a function.'
  );
});
