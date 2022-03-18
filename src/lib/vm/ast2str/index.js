'use strict'

const ast2strExpression = require('./ast2strExpression')
const ast2strInstruction = require('./ast2strInstruction')

const isInstructionType = ast => ast?.type === 'instruction' 

const isAst = ast => typeof ast === 'string' || typeof ast === 'number'

const evalAst = ast => (
    isInstructionType(ast) ? ast2strInstruction(ast) : ast2strExpression(ast)
)

/**
 * @param {Object || String || Number} ast 
 * @returns {String} ast converted to string
 */
const ast2str = ast => isAst(ast) ? ast : evalAst(ast)

module.exports = { ast2str }
