'use strict'

const { lexer } = require('../../../vm')
const { lexErrorMessage, okLexMessage } = require('../../utils/messages')

const tokenize = (arg) => lexer(arg)

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {Array<String>} tokens 
 */
const lex = ({ args, fileInfo }) => {
    let tokens
    const formatedArgs = args.join(' ')
    console.log(args)
    try {
        tokens = args.map(tokenize)
        okLexMessage(formatedArgs, tokens)
    } catch (error) {
        lexErrorMessage({ error: error.found, fileInfo })
    }
    return;
}

module.exports = lex