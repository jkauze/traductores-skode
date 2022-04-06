'use strict'

const data = require('../data')
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

const isAst = ast => typeof ast === 'object'

const getStringExpressionBinary = (tmpLvalue, op, tmpRvalue) => `${tmpLvalue} ${op} ${tmpRvalue}`

const getStringExpressionUnary = (value, op) => `${op} ${value}`

const isBinary = (tmpLvalue, tmpRvalue) => !!tmpLvalue && !!tmpRvalue

const isIdentifier = value => typeof value === 'string'

const isQuoteOp = op => op === 'quote'

const isExpressionValue = value => typeof data[value]['value'] === 'object' ? evalExpression(data[value]['value']) : data[value]['value']

const findValue = value => data[value] && isExpressionValue(value)

const getIdValue = value => findValue(value) || null

const referenceError = id => `Uncaught ReferenceError: "${id}" is not defined`

const notLvalueError = () => "La expresion no tiene LVALUE"

const invalidTypeConditionError = (guard) => `La condicion "${guard}" no es de tipo Booleana`

const getValue = value => isIdentifier(value) ? getIdValue(value) : value

const getExpressionString = (lvalue, op, rvalue) => (
    isBinary(lvalue, rvalue) ? getStringExpressionBinary(lvalue, op, rvalue) : getStringExpressionUnary(lvalue, op)
)

const isNotBooleanType = guard => typeof guard !== 'boolean'

const isNotValidIndex = value => typeof value !== 'number' || value < 0

const evaluateIf = (guard, expT, expF) => {
    const { result: guardCondition } = evalExpression(guard)
    if (isNotBooleanType(guardCondition)) throw new Error(invalidTypeConditionError(guard))
    return guardCondition ? evalExpression(expT) : evalExpression(expF)
}

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
const isIfFunction = op => op === 'if'
const isIndexArray = op => op === 'index'

let quoted = false

/**
 * @param {Object || String} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object}
 */
const evaluateExpression = (ast, option = false) => {
    quoted = option
    if (!isAst(ast)) return getValue(ast)
    const { op, operands } = ast
    if (isResetFunction(op)) return reset()
    if (isPIFunction(op)) return pi()
    if (isNowFunction(op)) return now()
    if (isUniformFunction(op)) return uniform()
    if (isLengthFunction(op)) return length(operands[0])
    if (isFloorFunction(op)) return floor(operands[0])
    if (isIfFunction(op)) {
        const { result } = evaluateIf(operands[0], operands[1], operands[2])
        return result
    }
    if (isIndexArray(op)) {
        const { result: indexExpression } = evaluateExpression(operands[1])
        const index = indexExpression || operands[1]
        if (isNotValidIndex(index)) return undefined
        const indexOfArray = operands[0][index]
        const { result } = evalExpression(indexOfArray)
        return result

    }
    if (isSumFunction(op)) {
        const operandsValue = operands[0].map(getValue)
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
        if (ltypeResult === 'NOT_ASSIGNABLE_ERROR') throw new Error(notLvalueError())
        return ltypeResult
    }
    if (isAvgFunction(op)) {
        const operandsValue = operands[0].map(getValue)
        return avg(operandsValue)
    }
    const [lvalue, rvalue] = operands


    let tmpLvalue = getValue(lvalue)
    let tmpRvalue = getValue(rvalue)
    let stringExpression
    if (!tmpLvalue && !!lvalue) throw new Error(referenceError(lvalue))
    if (!tmpRvalue && !!rvalue) throw new Error(referenceError(rvalue))

    /**
     * validaciones:
     * no se pueden sumar cosas con Boolean
     * no se puede dividir entre 0
     * no se puede operar arreglos
     * no se pueden operar variables no definidas
     * definir cuales operadores binarios/unarios son para los Boolean
     */
    if (isAst(tmpLvalue)) tmpLvalue = evaluateExpression(tmpLvalue, quoted)
    if (isAst(tmpRvalue)) tmpRvalue = evaluateExpression(tmpRvalue, quoted)
    if (isQuoteOp(op)) {
        stringExpression = tmpLvalue
        quoted = true
    }
    else stringExpression = getExpressionString(tmpLvalue, op, tmpRvalue)
    return eval(stringExpression)
}

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const transformItem = item => isAst(item) ? evaluateExpression(item) : item

const evalArray = ast => ast.map(transformItem)

const evalExpression = ast => Array.isArray(ast)
    ? { result: formatExpression(evalArray(ast)), quoted }
    : { result: evaluateExpression(ast), quoted }

module.exports = { evalExpression }