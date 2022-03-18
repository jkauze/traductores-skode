'use strict';

const peggy = require('peggy');
const { lexer } = require('../lexer');
const grammar = require('./parser.grammar');

const createParser = peggy.generate(grammar);

const tokenize = (arg) => lexer(arg)

const getTokens = (args) => args.map(tokenize)

const validateCommas = (tokens) => tokens.split(',')

const tokens2str = (args) => {
  const tokensString = args.join(' ')
  const sanitizedTokens = validateCommas(tokensString)
  return sanitizedTokens.join(' ')
}

const executeParser = (tokensString) => createParser.parse(tokensString)

const debugMessage = (tokensString) => console.log(`DEBUG* ast input -->  ${tokensString}`)

/**
 * @param {Array<String>} args 
 * @returns {Object} ast
 */
const parser = (args) => {
  const tokens = getTokens(args)
  const tokensString = tokens2str(tokens)
  // debugMessage(tokensString)
  return executeParser(tokensString)
}

module.exports = {
  parser
};
