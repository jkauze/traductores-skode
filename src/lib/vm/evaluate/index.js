'use strict'

const { statusTypes } = require('../../../shared')
const { evalExpression } = require('./evalExpression')
const formatResponse = require('../utils/formatResponse')

/**
 * @param {Object || String} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object}
 */
const evaluate = ast => {
    try {
        const { result } = evalExpression(ast)
        return formatResponse(result, statusTypes.OK)
    } catch (error) {
        return error.found || error.message
    }

}

module.exports = { evaluate }