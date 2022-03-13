'use strict'

const hasChild = require('./hasChild')

const formatExpressionString = (leftOperand, op, rightOperand) => (
    `(${leftOperand} ${op} ${rightOperand})`
)

/**
 * @param {Object} ast 
 * @returns {String} formatted ast expression to string
 */
const ast2strExpression = ast => {
    const { op, operands } = ast
    const [leftOperand, rightOperand] = operands
    let newRightOperand = rightOperand

    if (hasChild(operands)) newRightOperand = ast2strExpression(rightOperand)

    return formatExpressionString(leftOperand, op, newRightOperand)
}

module.exports = ast2strExpression