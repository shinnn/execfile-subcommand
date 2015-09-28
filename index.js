'use strict';

const execFile = require('child_process').execFile;

module.exports = function execFileSubcommand(command, subcommand, args, options, cb) {
  if (typeof command !== 'string') {
    throw new TypeError(
      String(command) +
      ' is not a string. Expected a filename of the program to run.'
    );
  }

  if (command === '') {
    throw new Error('Expected a filename of the program to run, but received an empty string.');
  }

  if (typeof subcommand !== 'string') {
    throw new TypeError(
      String(subcommand) +
      ' is not a string. Expected one of the `' + command + '` subcommands.'
    );
  }

  if (subcommand === '') {
    throw new Error('Expected one of the `' + command + '` subcommands, but received an empty string.');
  }

  if (cb === undefined) {
    cb = options;

    if (Array.isArray(args)) {
      options = {};
    } else {
      options = args;

      if (cb === undefined) {
        cb = args;
      }

      args = [];
    }
  }

  if (!Array.isArray(args)) {
    if (!options) {
      options = args;
      args = [];
    } else if (args !== undefined && args !== null) {
      throw new TypeError(
        String(args) +
        ' is not an array.' +
        ' Expected a list of arguments to be passed to' +
        ' `' + command + ' ' + subcommand + '` command.'
      );
    }
  }

  if (typeof cb !== 'function') {
    throw new TypeError(
      String(cb) +
      ' is not a function. Expected a callback function' +
      ' called after version check of `' +
      command + [' ' + subcommand].concat(args).join(' ') + '` command.'
    );
  }

  execFile(command, [subcommand].concat(args), options, cb);
};
