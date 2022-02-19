'use strict';

const { notImplemented } = require('../replErrors');

const oKMessage = (input, tokens) =>
  console.log(`OK: lexer(${input}) ==> ${tokens}`);

const ackMessage = (input) =>
  console.log(`ACK: ${input}`);

  const errorMessage = (input, error = notImplemented) =>
  console.log(`ERROR: "${input}" ==> ${error}`);

module.exports = {
  oKMessage,
  ackMessage,
  errorMessage
};
