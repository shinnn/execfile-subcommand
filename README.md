# execfile-subcommand

[![NPM version](https://img.shields.io/npm/v/execfile-subcommand.svg)](https://www.npmjs.com/package/execfile-subcommand)
[![Build Status](https://travis-ci.org/shinnn/execfile-subcommand.svg?branch=master)](https://travis-ci.org/shinnn/execfile-subcommand)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/execfile-subcommand.svg)](https://coveralls.io/github/shinnn/execfile-subcommand)
[![devDependencies Status](https://david-dm.org/shinnn/execfile-subcommand/dev-status.svg)](https://david-dm.org/shinnn/execfile-subcommand?type=dev)

[`child_process#execFile`][execfile] with an additional `subcommand` argument

```javascript
const execFileSubcommand = require('execfile-subcommand');

execFileSubcommand('npm', 'view', ['npm@3.0.0', 'version'], (err, stdout, stderr) => {
  stdout; //=> '3.0.0\n'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install execfile-subcommand
```

## API

### execFileSubcommand(*file*, *subcommand* [, *args*, *opts*, *cb*])

*file*: `String` (filename of the program to run)  
*subcommand*: `String` (subcommand of the root command)  
*args*: `Array` of strings (arguments passed to the subcommand)  
*opts*: `Object` ([`child_process#execFile`][execfile] options)  
*cb*: `Function` ([callback](http://thenodeway.io/posts/understanding-error-first-callbacks/) function)  
Return: [`ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess) instance

Instead of running the root program directly as [`child_process#execFile`][execfile] does, it runs the given subcommand of the program specified with the second argument.

```javascript
const execFileSubcommand = require('execfile-subcommand');
execFileSubcommand('npm' 'install', ['babel'], () => {/* ... */});

// --- is almost the same script as ---

const {execFile} = require('child_process');
execFile('npm' ['install', 'babel'], () => {/* ... */});
```

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[execfile]: https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback
