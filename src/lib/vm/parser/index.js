'use strict';

const peggy = require('peggy');
const { lexer } = require('../lexer');
const grammar = require('./parser.grammar');

const createParser = peggy.generate(grammar);

const tokenize = (arg) => lexer(arg)

const getTokens = (args) =>  args.map(tokenize)

const validateCommas = (tokens) => tokens.split(',')

const tokens2str = (args) =>  {
  const tokensString = args.join(' ')
  const sanitizedTokens = validateCommas(tokensString)
  return sanitizedTokens.join(' ')
}

const executeParser = (tokensString) => createParser.parse(tokensString)

/**
 * @param {Array<String>} args 
 * @returns {Object} ast
 */
const parser = (args) => {
  // console.log(args)
  const tokens = getTokens(args) 
  const tokensString = tokens2str(tokens)
  console.log(`DEBUG* ast input -->  ${tokensString}`)
  const a = executeParser(tokensString)
  console.log(a, tokensString)
  return a
}

module.exports = {
  parser
};
