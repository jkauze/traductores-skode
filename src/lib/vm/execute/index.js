'use strict'

const data = require('../data')
const { evalExpression } = require('../evaluate/evalExpression')
const formatResponse = require('../utils/formatResponse')
const statusTypes = require('../../../shared/statusTypes')

const mapType = {
    number: 'Num',
    boolean: 'Boolean'
}

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
    const resultRvalue = evalExpression(rvalue)

    if (isAssignation(type)) {
        if (isNotDefined(lvalue)) return referenceError(lvalue)
        if (hasNotValidType(resultRvalue, dataType(lvalue))) return typeError(resultRvalue, dataType(lvalue))
        updateMem(lvalue, resultRvalue)
        return formatResponse(`${lvalue} ${op} ${resultRvalue}`, statusTypes.ACK);
    } else {
        if (hasNotValidType(resultRvalue, type)) return typeError(resultRvalue, type)
        updateMem(lvalue, resultRvalue, type)
        return formatResponse(`${type} ${lvalue} ${op} ${resultRvalue}`, statusTypes.ACK);
    }

}

module.exports = { execute }