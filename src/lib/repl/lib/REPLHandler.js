'use strict';

const { errorMessage } = require('../utils/messages');
const { fileReader } = require('../utils/fileReader')
const { lex, testParser, failed, reset, help } = require('./commands')

const isLexCommand = firstArg => firstArg === '.lex';
const isTestParserCommand = firstArg => firstArg === '.ast';
const isLoadCommand = firstArg => firstArg === '.load';
const isFailedCommand = firstArg => firstArg === '.failed';
const isResetCommand = firstArg => firstArg === '.reset';
const isHelpCommand = firstArg => firstArg === '.help';
const isExitCommand = firstArg => firstArg === '.';

const getArgs = (input) => {
  const formatedArgs = input.replace(/\s+/g,' ').trim()
  return formatedArgs.split(' ');
}

const getFirstArg = (input) => input.shift();

const validateSpecialCall = (input) => input && input[0] === '.';

const printError = ({ input, error, fileInfo }) => input ? errorMessage({ input, error, fileInfo }) : null;

const executeLine = fileName => (data, line) => {
  const result = REPLHandler(data, { fileName, line });
  if (result === 'break') process.exit(0);
}

/**
 * @param {Object} options 
 * @param {String} options.firstArg 
 * @param {Array<String>} options.args
 * @param {String} options.input
 * @param {[Object]} options.fileInfo
 * @returns 
 */
const evalSpecialCall = ({ firstArg, args, input, fileInfo }) => {
  if (isExitCommand(firstArg)) {
    return 'break';
  } else if (isLexCommand(firstArg)) {
    lex({ args, fileInfo })
    return;
  } else if (isTestParserCommand(firstArg)) {
    testParser({ args, fileInfo })
    return;
  } else if (isFailedCommand(firstArg)) {
    failed({ input, fileInfo })
    return;
  } else if (isResetCommand(firstArg)) {
    reset({ input, fileInfo })
    return;
  } else if (isHelpCommand(firstArg)) {
    help();
    return;
  } else if (isLoadCommand(firstArg)) {
    const fileName = args[0];
    const fileContent = fileReader(fileName);
    if (fileContent) {
      fileContent.lines.forEach(executeLine(fileName));
    } else {
      const error = `Error loading file: ${args.join(' ')}`
      printError({ input, error })
    }
    return;
  } else {
    printError({ input, fileInfo })
    return;
  }
}

/**
 * Root Handler for the REPL
 * @param {[Object]} fileInfo
 * @param {[Object]} fileInfo.fileName
 * @param {[Object]} fileInfo.line
 * @param {String} input
 */
const REPLHandler = (input, fileInfo) => {
  if (validateSpecialCall(input)) {
    const args = getArgs(input);
    const firstArg = getFirstArg(args);
    return evalSpecialCall({ firstArg, args, input, fileInfo })
  } else {
    printError({ input, fileInfo })
    return;
  }
};

module.exports = {
  REPLHandler
};
