'use strict'

const data = require('../data')
const { evalExpression } = require('../evaluate/evalExpression')
const formatResponse = require('../utils/formatResponse')
const statusTypes = require('../../../shared/statusTypes')

const mapType = {
    number: 'Num',
    boolean: 'Boolean'
}

const isNotAst = ast => typeof ast !== 'object'

const getType = (rvalue) => mapType[typeof rvalue]

const hasNotValidType = (rvalue, type) => getType(rvalue) !== type

const isAssignation = type => !type

const isNotDefined = lvalue => !data[lvalue]

const updateMem = (lvalue, rvalue, type) => Object.assign(data, {
    [lvalue]: {
        value: rvalue,
        type: type || data[lvalue]['type']
    }
})

const dataType = lvalue => data[lvalue]['type']

const referenceError = lvalue => (
    formatResponse(`Uncaught ReferenceError: ${lvalue} is not defined`, statusTypes.ERROR)
)
const typeError = (rvalue, type) => (
    formatResponse(`TypeError: "${rvalue}" is not "${type}" type`, statusTypes.ERROR)
)

/**
 * @param {Object} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object} response
 * @returns {String} response.status
 * @returns {String} response.message
 */
const execute = ast => {
    const { operands, op } = ast
    const [lvalue, rvalue, type] = operands
    const { result, quoted } = evalExpression(rvalue)
    const resultExpression = quoted ? rvalue : result

    if (isAssignation(type)) {
        if (isNotDefined(lvalue)) return referenceError(lvalue)
        if (hasNotValidType(result, dataType(lvalue))) return typeError(result, dataType(lvalue))
        updateMem(lvalue, resultExpression)
        return formatResponse(`${lvalue} ${op} ${result}`, statusTypes.ACK);
    } else {
        if (hasNotValidType(result, type)) return typeError(result, type)
        updateMem(lvalue, resultExpression, type)
        return formatResponse(`${type} ${lvalue} ${op} ${result}`, statusTypes.ACK);
    }

}

module.exports = { execute }