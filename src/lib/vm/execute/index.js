'use strict'

const data = require('../data')
const memTick = require('../memTick')
const { evalExpression } = require('../evaluate/evalExpression')
const formatResponseExecute = require('../utils/formatResponseExecute')
const { isAst } = require('../utils/astHelpers')
const statusTypes = require('../../../shared/statusTypes')
const { ast2str } = require('../ast2str')

const mapType = {
    number: 'num',
    boolean: 'bool',
    object: 'Array'
}

const getType = (rvalue) => mapType[typeof rvalue]

const checkArrayItemsType = (array, type) => array.reduce((prev, act) =>
    mapType[typeof act] === type && prev,
    true)

const hasNotValidArrayIndex = (type, rvalue) => Array.isArray(type) && mapType[typeof rvalue] !== type[0]

const validateArrayType = (type, rvalue) => Array.isArray(rvalue) && checkArrayItemsType(rvalue, type[0])

const hasNotValidType = (rvalue, type) => Array.isArray(type) ? validateArrayType(type, rvalue) : getType(rvalue) !== type

const isAssignation = type => !type

const isNotDefined = lvalue => !data[lvalue]

const updateMemCycle = () => {
    const previousTick = memTick[memTick.length - 1]
    const actualTick = previousTick + 1
    memTick.push(actualTick)
    return actualTick
}

const restoreMemCycle = () => memTick.pop()

const updateMem = ({ lvalue, result, type, quoted, cvalue, actualTick }) => Object.assign(data, {
    [lvalue]: {
        value: result,
        rvalue: result,
        cvalue: quoted ? cvalue : result,
        tick: actualTick,
        type: type || data[lvalue]['type']
    }
})

const replaceArrayIndex = (index, array, value) => {
    const formatedArray = JSON.parse(array)
    formatedArray[index] = value
    return formatedArray
}

const dataType = lvalue => data[lvalue]['type']

const referenceError = lvalue => (
    formatResponseExecute(`Uncaught ReferenceError: ${lvalue} is not defined`, statusTypes.ERROR)
)
const typeError = (rvalue, type) => (
    formatResponseExecute(`TypeError: "${rvalue}" is not "${type}" type`, statusTypes.ERROR)
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
    const cvalueString = ast2str(cvalue)
    try {
        const actualTick = updateMemCycle()
        const { result, quoted } = evalExpression(cvalue)
        if (isAst(lvalue) && lvalue.op === 'index') {
            const { operands } = lvalue
            const arrayIdLvalue = operands[0]
            const arrayIndex = operands[1]
            const arrayType = dataType(arrayIdLvalue)
            if (isNotDefined(arrayIdLvalue)) return referenceError(arrayIdLvalue)
            const { result: arrayLvalue } = evalExpression(arrayIdLvalue)
            const { result: rvalue, quoted: cvalueQuoted } = evalExpression(cvalue)
            if (hasNotValidArrayIndex(arrayType, rvalue)) return typeError(rvalue, arrayType)
            const newArray = replaceArrayIndex(arrayIndex, arrayLvalue, rvalue)
            updateMem({ lvalue: arrayIdLvalue, result: newArray, cvalueQuoted, cvalue, actualTick })
            return formatResponseExecute(`${arrayIdLvalue} ${op} [${newArray}]`, statusTypes.ACK);
        }
        else if (isAssignation(type)) {
            if (isNotDefined(lvalue)) return referenceError(lvalue)
            if (hasNotValidType(result, dataType(lvalue))) return typeError(result, dataType(lvalue))
            updateMem({ lvalue, result, quoted, cvalue, actualTick })
            return quoted ? formatResponseExecute(`${lvalue} ${op} ${cvalueString}`, statusTypes.ACK) : formatResponseExecute(`${lvalue} ${op} ${result}`, statusTypes.ACK);
        } else {
            if (hasNotValidType(result, type)) return typeError(result, type)
            updateMem({ lvalue, result, type, quoted, cvalue, actualTick })
            return quoted ? formatResponseExecute(`${formatType(type)} ${lvalue} ${op} ${cvalueString}`, statusTypes.ACK) : formatResponseExecute(`${formatType(type)} ${lvalue} ${op} ${result}`, statusTypes.ACK);
        }
    } catch (error) {
        restoreMemCycle()
        throw error
    }

}

module.exports = { execute }