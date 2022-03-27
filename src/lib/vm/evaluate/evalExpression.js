'use strict'

const data = require('../data')

const isAst = ast => typeof ast === 'object'

const getStringExpression = (tmpLvalue, op, tmpRvalue) => `${tmpLvalue} ${op} ${tmpRvalue}`

const getStringExpressionUnary = (value, op) => `${op} ${value}`

const isBinary = (tmpLvalue, tmpRvalue) => !!tmpLvalue && !!tmpRvalue

const isIdentifier = value => typeof value === 'string'

const findValue = ast => data[ast] && data[ast]['value']

const getIdValue = value => (
    findValue(value) || null
)

const referenceError = id => `Uncaught ReferenceError: "${id}" is not defined`

const getValue = value => isIdentifier(value) ? getIdValue(value) : value

/**
 * @param {Object || String} ast
 * @param {String} ast.op
 * @param {Array} ast.operands
 * @param {String} ast.type
 * @returns {Object}
 */
const evaluateExpression = ast => {
    if (!isAst(ast)) return ast
    const { op, operands } = ast
    const [lvalue, rvalue] = operands
    let tmpLvalue = getValue(lvalue)
    let tmpRvalue = getValue(rvalue)

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
    if (isAst(tmpLvalue)) tmpLvalue = evaluateExpression(tmpLvalue)
    if (isAst(tmpRvalue)) tmpRvalue = evaluateExpression(tmpRvalue)
    const stringExpression = isBinary(tmpLvalue, tmpRvalue) ? getStringExpression(tmpLvalue, op, tmpRvalue) : getStringExpressionUnary(tmpLvalue, op)
    return eval(stringExpression)
}

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const transformItem = item => isAst(item) ? evaluateExpression(item) : item

const evalArray = ast => ast.map(transformItem)

const evalExpression = ast => Array.isArray(ast) ? formatExpression(evalArray(ast)) : evaluateExpression(ast)

// console.log(evaluateExpression(ast2))

module.exports = { evalExpression }