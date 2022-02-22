'use strict'

const { parser } = require('../../../lexer/index')
const { lexErrorMessage, okMessage } = require('../../utils/messages')

const tokenize = (arg) => parser(arg)

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {Array<String>} tokens 
 */
const lex = ({ args, fileInfo }) => {
    let tokens
    const formatedArgs = args.join(' ')
    try {
        tokens = args.map(tokenize)
        okMessage(formatedArgs, tokens)
    } catch (error) {
        lexErrorMessage({ error: error.found, fileInfo })
    }
    return;
}

module.exports = lex