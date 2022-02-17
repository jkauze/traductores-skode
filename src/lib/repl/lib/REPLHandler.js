'use strict';

const { errorMessage } = require('../utils/messages');

const getArgs = (input) => input.split(' ');

const getParams = (input) => input.join(' ');

const getFirstChar = (args) => args.shift();

const validateSpecialCall = (input) => input && input[0] === '.';

/**
 * Root Hanlder for the REPL
 * @param {String} input
 */
const REPLHandler = (input) => {
  if (validateSpecialCall(input)) {
    const args = getArgs(input);
    const specialCommand = getFirstChar(args);
    const params = getParams(args);

    if (specialCommand === '.') {
      return 'break';
    }
  } else {
    input ? errorMessage(input) : true;
    return;
  }
};

module.exports = {
  REPLHandler
};
