'use strict';

const peggy = require('peggy');
const { lexer } = require('../lexer');
const grammar = require('./parser.grammar');

const createParser = peggy.generate(grammar);

const tokenize = (arg) => lexer(arg)

const getTokens = (args) =>  args.map(tokenize)

const tokens2str = (args) =>  args.join(' ')

const executeParser = (tokensString) => createParser.parse(tokensString)

/**
 * @param {Array<String>} args 
 * @returns {Object} ast
 */
const parser = (args) => {
  const tokens = getTokens(args) 
  const tokensString = tokens2str(tokens)
  console.log(`DEBUG* ast input -->  ${tokensString}`)
  return executeParser(tokensString)
}

module.exports = {
  parser
};
