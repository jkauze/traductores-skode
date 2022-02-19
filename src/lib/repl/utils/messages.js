'use strict';

const { notImplemented } = require('../replErrors');

const oKMessage = (input, tokens) =>
  console.log(`OK: lexer(${input}) ==> ${tokens}`);

const ackMessage = (input) =>
  console.log(`ACK: ${input}`);

const errorMessage = (input, error = notImplemented) =>
  console.log(`ERROR: "${input}" ==> ${error}`);

const lexErrorMessage = (error) =>
  console.log(`ERROR: caracter inválido ("${error}") en la entrada`)

module.exports = {
  oKMessage,
  ackMessage,
  errorMessage,
  lexErrorMessage
};
