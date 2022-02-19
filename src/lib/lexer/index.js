'use strict';

const peggy = require('peggy');
const grammar = require('./lexer.grammar');

const createParser = peggy.generate(grammar);

module.exports = {
  parser: createParser.parse
};
