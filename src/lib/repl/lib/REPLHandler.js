'use strict';

const { errorMessage } = require('../utils/messages');
const { commandNotFound } = require('../replErrors');
const { fileReader } = require('../utils/fileReader')

const getArgs = (input) => input.split(' ');

const getParams = (input) => input.join(' ');

const getFirstChar = (args) => args.shift();

const validateSpecialCall = (input) => input && input[0] === '.';

/**
 * Root Handler for the REPL
 * @param {String} input
 */
const REPLHandler = (input) => {
  if (validateSpecialCall(input)) {
    const args = getArgs(input);
    const specialCommand = getFirstChar(args);
    const params = getParams(args);

    switch (specialCommand) {
      case '.':
        return 'break';
      case '.lex':
        // Executes lextest function (Not implemented yet)
        input ? errorMessage(input, commandNotFound(specialCommand)) : true;
        break;
      case '.load':
        const fileContent = fileReader(params);
        
        if (fileContent) {
          fileContent.lines.forEach(line => {
            const result = REPLHandler(line);
            /* 
            HELP

            este caso no esto claro de como manejarlo todavia. Porque cuando
            la recursion se encuentra con un . en la lectura de archivos, lo 
            ignora y continua. Se me ocurre reescribir la manera en la que se
            manda a parar el proceso, para que no sea una validacion dentro del
            index del repl sino que sea algo global.
            */
            if (result === 'break') return;
          });
        } else {
          console.log(`Error loading file: ${params}`)
        }

        break;
      case '.failed':
        // Show errors reported by the VM (Not implemented yet)
        input ? errorMessage(input, commandNotFound(specialCommand)) : true;
        break;
      case 'reset':
        // Clear error list (Not implemented yet)
        input ? errorMessage(input, commandNotFound(specialCommand)) : true;
        break;
      default:
        input ? errorMessage(input, commandNotFound(specialCommand)) : true;
    }

  } else {
    input ? errorMessage(input) : true;
    return;
  }
};

module.exports = {
  REPLHandler
};
