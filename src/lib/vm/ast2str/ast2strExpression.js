'use strict'

const hasChild = require('./hasChild')

const formatExpressionString = (leftOperand, op, rightOperand) => (
    `(${leftOperand} ${op} ${rightOperand})`
)

const formatUnaryExpressionString = (leftOperand, op) => `(${op}${leftOperand})`

const isObject = operand => typeof operand === 'object'

const orderOperands = (l, r) => isObject(l) ? [r, l] : [l, r]

/**
 * @param {Object} ast 
 * @returns {String} formatted ast expression to string
 */
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

module.exports = ast2strExpression