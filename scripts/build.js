const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

process.chdir(path.resolve(__dirname, '../packages/' + process.argv[2]));
if(process.argv[3] && process.argv[3] === '-dev'){
  exec('yarn build:dev');
} else if (process.argv[3] && process.argv[3] === '-test') {
  exec('yarn build:test');
}  else if (process.argv[3] && process.argv[3] === '-test2') {
  exec('yarn build:test2');
} else if (process.argv[3] && process.argv[3] === '-pre') {
  exec('yarn build:pre');
} else if (process.argv[3] && process.argv[3] === '-prod') {
  exec('yarn build:prod');
} else {
  exec('yarn build');
}
exec('yarn build:type');

console.info('分割线');

process.chdir(cwd);
