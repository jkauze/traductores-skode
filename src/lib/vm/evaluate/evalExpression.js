'use strict'

const data = require('../data')
const errors = require('./errors')
const memTick = require('../memTick')
const { isNotAst, isAst } = require('./utils/astHelpers')

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
const { lnFunction } = require('../ln')
const { sin } = require('../sin')
const { cos } = require('../cos')
const { exp } = require('../exp')
const { formula } = require('../formula')
const { tick } = require('../tick')

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
const isLnFunction = op => op === 'ln'
const isSinFunction = op => op === 'sin'
const isCosFunction = op => op === 'cos'
const isExpFunction = op => op === 'exp'
const isSQRTFunction = op => op === 'sqrt'
const isFormulaFunction = op => op === 'formula'
const isTickFunction = op => op === 'tick'
const isHistogramFunction = op => op === 'histogram'
const isArrayFunction = op => op === 'array'
const isIfFunction = op => op === 'if'
const isIndexArray = op => op === 'index'
const isErrorFunction = op => op === 'function'
const isQuoteOp = op => op === 'quote'

let quoted = false

const getStringExpressionBinary = (tmpLvalue, op, tmpRvalue) => `${tmpLvalue} ${op} ${tmpRvalue}`

const getStringExpressionUnary = (value, op) => `${op} ${value}`

const isBinary = (tmpLvalue, tmpRvalue) => tmpLvalue !== undefined && tmpRvalue !== undefined

const isIdentifier = value => typeof value === 'string'

const isValidSize = size => typeof size === 'number' && size >= 0

const isNotValidIndex = value => typeof value !== 'number' || value < 0

const findIdValue = (value) => {
    if (data[value] === undefined) throw new Error(errors.reference(value))
    const actualTick = memTick[memTick.length - 1]
    const tickIdValue = data[value]['tick']
    if (isAst(data[value]['cvalue']) && tickIdValue !== actualTick) {
        const { result: idValue } = evalExpression(data[value]['cvalue'])
        data[value]['tick'] = actualTick
        data[value]['rvalue'] = idValue
        return idValue
    }
    else return data[value]['rvalue']
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
    if (isLnFunction(op)) return lnFunction(evaluateExpression(operands[0]))
    if (isSinFunction(op)) return sin(evaluateExpression(operands[0]))
    if (isCosFunction(op)) return cos(evaluateExpression(operands[0]))
    if (isExpFunction(op)) return exp(evaluateExpression(operands[0]))
    if (isSQRTFunction(op)) return Math.sqrt(evaluateExpression(operands[0]))
    if (isFormulaFunction(op)) return formula(operands[0])
    if (isTickFunction(op)) return tick()
    if (isArrayFunction(op)) {
        const size = evaluateExpression(operands[0])
        const resultArray = []
        if (!isValidSize(size)) throw new Error(errors.invalidSize(size))
        if (evaluateExpression(operands[1]) && quoted) {
            for (let index = 0; index < size; index++) {
                const value = evaluateExpression(operands[1])
                resultArray.push(value)
            }
        } else {
            const value = evaluateExpression(operands[1])
            for (let index = 0; index < size; index++) {
                resultArray.push(value)
            }
        }
        return `[${resultArray}]`
    }
    
    if (isHistogramFunction(op)) {
        let samples = []
        for (let sample = operands[1]; sample > 0; sample--) {
            samples.push(evaluateExpression(operands[0]))
            tick()
        }

        const stepSize = (operands[4] - operands[3]) / operands[2]
        let step = stepSize
        let buckets = Array(operands[2]).fill(0)
        let histogram = buckets.map((bucket, index, buckets) => {
            const stepSamples = samples.filter( value => step - stepSize < value && value < step )
            step += stepSize
            return bucket + stepSamples.length
        })

        return histogram
    }
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
        const { result: arrayExpression } = evalExpression(operands[0])
        const array = JSON.parse(arrayExpression) ?? operands[0]
        const index = indexExpression ?? operands[1]
        if (isNotValidIndex(index)) return undefined
        const indexOfArray = array[index]
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

const formatArrayExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const transformItem = item => isAst(item) ? evaluateExpression(item) : getIdValue(item)

const evalArray = ast => ast.map(transformItem)

const evalExpression = ast => Array.isArray(ast)
    ? { result: formatArrayExpression(evalArray(ast)), quoted }
    : { result: evaluateExpression(ast), quoted }

module.exports = { evalExpression }