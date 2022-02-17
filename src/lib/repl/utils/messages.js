'use strict';

const { notImplemented } = require('../replErrors');

const errorMessage = (input, error = notImplemented) =>
  console.log(`ERROR: "${input}" ==> ${error}`);

const oKMessage = (input, tokens) =>
  console.log(`OK: lexer("${input}") ==> ${tokens}`);

module.exports = {
  errorMessage,
  oKMessage
};
