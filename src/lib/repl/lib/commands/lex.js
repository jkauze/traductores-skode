'use strict'

const { parser } = require('../../../lexer/index')
const { lexErrorMessage } = require('../../utils/messages')

const tokenize = (arg) => parser(arg)

/**
 * 
 * @param {Array<String>} input params
 * @returns {Array<String>} tokens 
 */
const lex = (input) => {
    let tokens
    try {
        tokens = input.map(tokenize)
        console.log(tokens)
    } catch (error) {
        lexErrorMessage(error.found)
    }
    return;
}

module.exports = lex