'use strict';

const prompt = require('./utils/prompt');
const { version } = require('../../../package.json');

const { REPLHandler } = require('./lib/REPLHandler');
const { formatInput } = require('./utils/formatInput');

const promptStokhos = '<Stókhos> ';

const startREPL = () => {
  console.info(`Welcome to stokhos ${version}`);
  while (true) {
    const stdin = prompt(promptStokhos);
    const input = formatInput(stdin);

    const result = REPLHandler(input);
    if (result === 'break') break;
    prompt.history.save();
  }
};

startREPL();
process.exit(1);
