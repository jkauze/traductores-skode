'use strict'

const ast2strExpression = require('./ast2strExpression')
const ast2strInstruction = require('./ast2strInstruction')

const isInstructionType = ast => ast?.type === 'instruction' 

/**
 * @param {Object} ast 
 * @returns {String} ast converted to string
 */
const ast2str = ast => (
    isInstructionType(ast) ? ast2strInstruction(ast) : ast2strExpression(ast)
)

module.exports = { ast2str }
