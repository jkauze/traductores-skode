'use strict'

const data = require('../data')
const memTick = require('../memTick')
const { evalExpression } = require('../evaluate/evalExpression')
const formatResponse = require('../utils/formatResponse')
const statusTypes = require('../../../shared/statusTypes')

const mapType = {
    number: 'Num',
    boolean: 'Boolean',
    object: 'Array'
}

const getType = (rvalue) => mapType[typeof rvalue]

const checkArrayItemsType = (array, type) => array.reduce((prev, act) =>
    mapType[typeof act] === type && prev,
    true)

const validateArrayType = (type, rvalue) => Array.isArray(rvalue) && checkArrayItemsType(rvalue, type[0])

const hasNotValidType = (rvalue, type) => Array.isArray(type) ? validateArrayType(type, rvalue) : getType(rvalue) !== type

const isAssignation = type => !type

const isNotDefined = lvalue => !data[lvalue]

const updateMem = ({ lvalue, result, type, quoted, cvalue }) => {
    const previousTick = memTick[memTick.length - 1]
    const actualTick = previousTick + 1
    memTick.push(actualTick)
    Object.assign(data, {
        [lvalue]: {
            value: result,
            rvalue: result,
            cvalue: quoted ? cvalue : result,
            tick: actualTick,
            type: type || data[lvalue]['type']
        }
    })
}

const dataType = lvalue => data[lvalue]['type']

const referenceError = lvalue => (
    formatResponse(`Uncaught ReferenceError: ${lvalue} is not defined`, statusTypes.ERROR)
)
const typeError = (rvalue, type) => (
    formatResponse(`TypeError: "${rvalue}" is not "${type}" type`, statusTypes.ERROR)
)

const formatType = type => Array.isArray(type) ? `[${type}]` : type

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
    const [lvalue, cvalue, type] = operands
    const { result, quoted } = evalExpression(cvalue)

    if (isAssignation(type)) {
        if (isNotDefined(lvalue)) return referenceError(lvalue)
        if (hasNotValidType(result, dataType(lvalue))) return typeError(result, dataType(lvalue))
        updateMem({lvalue, result, quoted, cvalue})
        return formatResponse(`${lvalue} ${op} ${result}`, statusTypes.ACK);
    } else {
        if (hasNotValidType(result, type)) return typeError(result, type)
        updateMem({lvalue, result, type, quoted, cvalue})
        return formatResponse(`${formatType(type)} ${lvalue} ${op} ${result}`, statusTypes.ACK);
    }
}

module.exports = { execute }