'use strict';

const prompt = require('./utils/prompt');
const { version } = require('../../../package.json');

const { REPLHandler } = require('./lib/REPLHandler');
const { formatInput } = require('./utils/formatInput');

const promptStokhos = '<Stókhos> ';

const welcomeMessage = `Welcome to stokhos ${version}`
const helpMessage = 'Type ".help" for more information'

const infinityLoop = true

const startREPL = () => {
  console.info(welcomeMessage);
  console.info(helpMessage);
  while (infinityLoop) {
    const input = prompt(promptStokhos);
    const formatedInput = formatInput(input);

    if (!formatedInput) continue
    const result = REPLHandler(formatedInput);
    if (result === 'break') break;
    prompt.history.save();
  }
};

startREPL();
