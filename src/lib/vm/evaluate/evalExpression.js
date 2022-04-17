'use strict'

const data = require('../data')
const errors = require('./errors')
const {isNotAst, isAst} = require('./utils/astHelpers')

const { reset } = require('../reset')
const { pi } = require('../pi')
const { now } = require('../now')
const { uniform } = require('../uniform')
const { sum } = require('../sum')
const { avg } = require('../avg')
const { length } = require('../length')
const { floor } = require('../floor')
const { type } = require('../type')
const { ltype } = require('../ltype')
const { inFunction } = require('../in')
const { sin } = require('../sin')
const { cos } = require('../cos')
const { exp } = require('../exp')
const { formula } = require('../formula')

const isResetFunction = op => op === 'reset'
const isPIFunction = op => op === 'pi'
const isNowFunction = op => op === 'now'
const isUniformFunction = op => op === 'uniform'
const isSumFunction = op => op === 'sum'
const isTypeFunction = op => op === 'type'
const isLtypeFunction = op => op === 'ltype'
const isAvgFunction = op => op === 'avg'
const isLengthFunction = op => op === 'length'
const isFloorFunction = op => op === 'floor'
const isInFunction = op => op === 'in'
const isSinFunction = op => op === 'sin'
const isCosFunction = op => op === 'cos'
const isExpFunction = op => op === 'exp'
const isFormulaFunction = op => op === 'formula'
const isIfFunction = op => op === 'if'
const isIndexArray = op => op === 'index'
const isErrorFunction = op => op === 'function'
const isQuoteOp = op => op === 'quote'

let quoted = false

const getStringExpressionBinary = (tmpLvalue, op, tmpRvalue) => `${tmpLvalue} ${op} ${tmpRvalue}`

const getStringExpressionUnary = (value, op) => `${op} ${value}`

const isBinary = (tmpLvalue, tmpRvalue) => tmpLvalue !== undefined && tmpRvalue !== undefined

const isIdentifier = value => typeof value === 'string'

const isNotValidIndex = value => typeof value !== 'number' || value < 0

const isExpressionValue = value => typeof data[value]['value'] === 'object' ? evalExpression(data[value]['value']) : data[value]['value']

const findValue = value => data[value] && isExpressionValue(value)

const findIdValue = value => {
    if (findValue(value)) return findValue(value) 
    else throw new Error(errors.reference(value))
}

const mapOpRelationals = {
    '=': '==',
    '<>': '!=',
    '^': '**'
}

const formatOp = op => mapOpRelationals[op] || op

const getIdValue = value => isIdentifier(value) ? findIdValue(value) : value

const getExpressionString = (lvalue, op, rvalue) => (
    isBinary(lvalue, rvalue) ? getStringExpressionBinary(lvalue, op, rvalue) : getStringExpressionUnary(lvalue, op)
)

const isNotBooleanType = guard => typeof guard !== 'boolean'

const evaluateIf = (guard, expT, expF) => {
    const { result: guardCondition } = evalExpression(guard)
    if (isNotBooleanType(guardCondition)) throw new Error(errors.invalidFunction(guard))
    return guardCondition ? evalExpression(expT) : evalExpression(expF)
}

/**
 * @param {Object || String} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object}
 */
const evaluateExpression = (astInput, option = false) => {
    quoted = option
    const ast = astInput.result ?? astInput
    if (isNotAst(ast)) return getIdValue(ast)
    const { op, operands } = ast
    if (isResetFunction(op)) return reset()
    if (isPIFunction(op)) return pi()
    if (isNowFunction(op)) return now()
    if (isUniformFunction(op)) return uniform()
    if (isErrorFunction(op)) throw new Error(errors.invalidFunction(operands[0]))
    if (isLengthFunction(op)) {
        if (!Array.isArray(operands[0])) throw new Error(errors.objectIsNotIterable(op, operands[0]))
        return length(operands[0])
    } 
    // etapa 4
    if (isInFunction(op)) return inFunction(evaluateExpression(operands[0]))
    if (isSinFunction(op)) return sin(evaluateExpression(operands[0]))
    if (isCosFunction(op)) return cos(evaluateExpression(operands[0]))
    if (isExpFunction(op)) return exp(evaluateExpression(operands[0]))
    if (isFormulaFunction(op)) return formula(operands[0])
    //

    if (isFloorFunction(op)) {
        return floor(evaluateExpression(operands[0]))
    }
    if (isIfFunction(op)) {
        const { result } = evaluateIf(operands[0], operands[1], operands[2])
        return result
    }
    if (isIndexArray(op)) {
        const { result: indexExpression } = evalExpression(operands[1])
        const index = indexExpression ?? operands[1]
        if (isNotValidIndex(index)) return undefined
        const indexOfArray = operands[0][index]
        const { result } = evalExpression(indexOfArray)
        return result
    }
    if (isSumFunction(op)) {
        if (!Array.isArray(operands[0])) throw new Error(errors.objectIsNotIterable(op, operands[0]))
        const operandsValue = operands[0].map(item => {
            const { result } = evalExpression(item)
            return result
        })
        return sum(operandsValue)
    }
    if (isTypeFunction(op)) {
        const { result } = evalExpression(operands[0])
        const isArray = Array.isArray(operands[0])
        return type(result, isArray)
    }
    if (isLtypeFunction(op)) {
        const { result } = evalExpression(operands[0])
        const isArray = Array.isArray(operands[0])
        const isAssignable = isIdentifier(operands[0]) && !!result
        const ltypeResult = ltype(result, isArray, isAssignable)
        if (ltypeResult === 'NOT_ASSIGNABLE_ERROR') throw new Error(errors.notLvalue())
        return ltypeResult
    }
    if (isAvgFunction(op)) {
        if (!Array.isArray(operands[0])) throw new Error(errors.objectIsNotIterable(op, operands[0]))
        const operandsValue = operands[0].map(item => {
            const { result } = evalExpression(item)
            return result
        })
        return avg(operandsValue)
    }
    const [lvalue, rvalue] = operands

    let tmpLvalue = getIdValue(lvalue)
    let tmpRvalue = getIdValue(rvalue)
    let stringExpression
    if (!tmpLvalue && !!lvalue) throw new Error(errors.reference(lvalue))
    if (!tmpRvalue && !!rvalue) throw new Error(errors.reference(rvalue))
    if (isAst(tmpLvalue)) tmpLvalue = evaluateExpression(tmpLvalue, quoted)
    if (isAst(tmpRvalue)) tmpRvalue = evaluateExpression(tmpRvalue, quoted)
    if (isQuoteOp(op)) {
        stringExpression = tmpLvalue
        quoted = true
    }
    else stringExpression = getExpressionString(tmpLvalue, formatOp(op), tmpRvalue)
    return eval(stringExpression)
}

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const transformItem = item => isAst(item) ? evaluateExpression(item) : getIdValue(item)

const evalArray = ast => ast.map(transformItem)

const evalExpression = ast => Array.isArray(ast)
    ? { result: formatExpression(evalArray(ast)), quoted }
    : { result: evaluateExpression(ast), quoted }

module.exports = { evalExpression }