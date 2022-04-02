'use strict';

const { notImplemented } = require('../replErrors');
const { saveError } = require('./saveError');

const okASTMessage = (input, tokens) => {
  const formatedMessage = `OK:ast("${input}") ==> ${tokens}`
  console.log(formatedMessage);
  return formatedMessage
}

const okLexMessage = (input, tokens) => {
  const formatedMessage = `OK:lex("${input}") ==> [${tokens}]`
  console.log(formatedMessage);
  return formatedMessage
}

const ackMessage = (message) => console.log(`ACK: ${message}`);

const okMessage = (message) => console.log(`OK: ${message}`);

const errorMessage = ({ input, error = notImplemented, fileInfo }) => {
  const formatedError = `ERROR: "${input}" ==> ${error}`
  console.log(formatedError);
  saveError({ fileInfo, error: formatedError })
}

const lexErrorMessage = ({ error, fileInfo }) => {
  const formatedError = `ERROR: caracter inválido ("${error}") en la entrada`
  console.log(formatedError)
  saveError({ fileInfo, error: formatedError })
}

const fatalErrorMessage = ({ error, fileInfo }) => {
  const formatedError = `SyntaxError: "${error}"`
  console.log(formatedError)
  saveError({ fileInfo, error: formatedError })
}

module.exports = {
  okMessage,
  okLexMessage,
  okASTMessage,
  ackMessage,
  errorMessage,
  lexErrorMessage,
  fatalErrorMessage
};
