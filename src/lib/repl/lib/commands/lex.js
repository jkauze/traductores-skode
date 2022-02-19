'use strict'

const { parser } = require('../../../lexer/index')

const tokenize = (arg) => parser(arg)

/**
 * 
 * @param {Array<String>} input params
 * @returns {Array<String>} tokens 
 */
const lex = (input) => {
    const tokens = input.map(tokenize)
    console.log(tokens)
    return;
}

module.exports = lex