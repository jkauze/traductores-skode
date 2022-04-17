'use strict'

const { statusTypes } = require('../../../shared')
const { evalExpression } = require('./evalExpression')
const formatResponse = require('../utils/formatResponse')
const data = require('../data')

const isNotAst = ast => typeof ast !== 'object'

const isIdentifier = ast => typeof ast === 'string'

const referenceError = ast => (
    formatResponse(`Uncaught ReferenceError: "${ast}" is not defined`, statusTypes.ERROR)
)

const isExpressionValue = ast => {
    const { result } = evalExpression(data[ast]['value'])
    return result || data[ast]['value']
}

const formatValue = ast => `${isExpressionValue(ast)}`

const findValue = ast => data[ast] && formatResponse(formatValue(ast), statusTypes.OK)

const getIdValue = ast => findValue(ast) || referenceError(ast)

/**
 * @param {Object || String} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object}
 */
const evaluate = ast => {
    try {
        if (isNotAst(ast)) return isIdentifier(ast) ? getIdValue(ast) : formatResponse(ast, statusTypes.OK)
        const { result } = evalExpression(ast)
        return formatResponse(result, statusTypes.OK)
    } catch (error) {
        return formatResponse(error.found || error.message, statusTypes.ERROR)
    }

}

module.exports = { evaluate }