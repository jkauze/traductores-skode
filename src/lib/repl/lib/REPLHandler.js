'use strict';

const { errorMessage } = require('../utils/messages');

const getArgs = (input) => input.split(' ');

const getFirstArg = (input) => input.shift();

const validateSpecialCall = (input) => input && input[0] === '.';

const printError = (input) => input ? errorMessage(input) : null;

const evalSpecialCall = (firstArg, args, input) => {
  if (firstArg === '.') {
    return 'break';
  } else if (firstArg === '.lex') {
    return;
  } else {
    printError(input)
    return;
  }
}

/**
 * Root Hanlder for the REPL
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
