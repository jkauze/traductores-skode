'use strict'

const ast2strExpression = require('./ast2strExpression')
const ast2strInstruction = require('./ast2strInstruction')

const isExpressionType = ({ type }) => type === 'expression'

/**
 * @param {Object} ast 
 * @returns {String} ast converted to string
 */
const ast2str = ast => (
    isExpressionType(ast) ? ast2strExpression(ast) : ast2strInstruction(ast)
)

module.exports = { ast2str }
