'use strict'

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

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
    let newLeftOperand = leftOperand

    if (isNode(newRightOperand)) newRightOperand = ast2strExpression(rightOperand)
    if (isNode(newLeftOperand)) newLeftOperand = ast2strExpression(leftOperand)

    if (isObject(originalLeftOperand)) {
        return formatExpressionString(newRightOperand, op, newLeftOperand)
    } else if (!rightOperand) {
        return formatUnaryExpressionString(newLeftOperand, op)
    } else {
        return formatExpressionString(newLeftOperand, op, newRightOperand)
    }
}

const transformItem = item => isNode(item) ? ast2strExpression(item) : item

const ast2strArrayExpression = ast => ast.map(transformItem);

/**
 * @param {Object} ast 
 * @returns {String} formatted ast expression to string
 */
const executeAST2Expression = ast => (
    Array.isArray(ast) ? formatExpression(ast2strArrayExpression(ast)) : ast2strExpression(ast)
)

module.exports = executeAST2Expression