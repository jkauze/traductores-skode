'use strict'

const data = require('../data')

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

const getValue = value => isIdentifier(value) ? getIdValue(value) : value

const getExpressionString = (lvalue, op, rvalue) => (
    isBinary(lvalue, rvalue) ? getStringExpressionBinary(lvalue, op, rvalue) : getStringExpressionUnary(lvalue, op)
)

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