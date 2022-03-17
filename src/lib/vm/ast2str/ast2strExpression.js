'use strict'

const hasChild = require('./hasChild')

const formatExpressionString = (leftOperand, op, rightOperand) => `(${leftOperand} ${op} ${rightOperand})`

const formatUnaryExpressionString = (leftOperand, op) => `(${op}${leftOperand})`

const isObject = operand => typeof operand === 'object'

const orderOperands = (l, r) => isObject(l) ? [r, l] : [l, r]

const isNode = item => typeof item === 'object'

const ast2strExpression = ast => {
    const { op, operands } = ast
    const [originalLeftOperand, originalRightOperand] = operands
    const [leftOperand, rightOperand] = orderOperands(originalLeftOperand, originalRightOperand)
    let newRightOperand = rightOperand

    if (hasChild(operands)) newRightOperand = ast2strExpression(rightOperand)

    if (isObject(originalLeftOperand)) {
        return formatExpressionString(newRightOperand, op, leftOperand)
    } else if (!rightOperand) {
        return formatUnaryExpressionString(leftOperand, op)
    } else {
        return formatExpressionString(leftOperand, op, newRightOperand)
    }
}

const transformItem = item => isNode(item) ? ast2strExpression(item) : item

const ast2strArrayExpression = ast => ast.map(transformItem);

/**
 * @param {Object} ast 
 * @returns {String} formatted ast expression to string
 */
const executeAST2Expression = ast => Array.isArray(ast) ? ast2strArrayExpression(ast) : ast2strExpression(ast)

module.exports = executeAST2Expression