'use strict';

const peggy = require('peggy');
const grammar = require('./parser.grammar');

const createParser = peggy.generate(grammar);

module.exports = {
  parser: createParser.parse
};
