'use strict';

const { errorMessage } = require('../utils/messages');
const { commandNotFound } = require('../replErrors');
const { fileReader } = require('../utils/fileReader')

const getArgs = (input) => input.split(' ');

const getFirstArg = (input) => input.shift();

const validateSpecialCall = (input) => input && input[0] === '.';

const printError = (input) => input ? errorMessage(input) : null;

const evalSpecialCall = (firstArg, args, input) => {
  if (firstArg === '.') {
    return 'break';
  } else if (firstArg === '.lex') {
    input ? errorMessage(input, commandNotFound(firstArg)) : true;
    return;
  } else if (firstArg === '.load') {
    const fileContent = fileReader(args[0]);
    if (fileContent) {
      fileContent.lines.forEach(line => {
        const result = REPLHandler(line);
        if (result === 'break') process.exit(0);
      });
    } else {
      console.log(`Error loading file: ${input}`)
    }
    return;
  } else if (firstArg === '.failed') {
    input ? errorMessage(input, commandNotFound(firstArg)) : true;
    return;
  } else if (firstArg === '.reset') {
    input ? errorMessage(input, commandNotFound(firstArg)) : true;
    return;
  }else {
    printError(input)
    return;
  }
}

/**
 * Root Handler for the REPL
 * @param {String} input
 */
const REPLHandler = (input) => {
  if (validateSpecialCall(input)) {
    const args = getArgs(input);
    const firstArg = getFirstArg(args);
    return evalSpecialCall(firstArg, args, input)
  } else {
    printError(input)
    return;
  }
};

module.exports = {
  REPLHandler
};
