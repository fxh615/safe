const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

const pkg = process.argv[2];

process.chdir(cwd);
