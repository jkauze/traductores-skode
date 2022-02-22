'use strict';

const { notImplemented } = require('../replErrors');
const { saveError } = require('./saveError');

const okMessage = (input, tokens) => {
  const formatedMessage = `OK:lex("${input}") ==> [${tokens}]`
  console.log(formatedMessage);
}

const ackMessage = (input) =>
  console.log(`ACK: ${input}`);

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

module.exports = {
  okMessage,
  ackMessage,
  errorMessage,
  lexErrorMessage
};
