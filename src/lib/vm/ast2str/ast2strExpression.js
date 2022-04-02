'use strict'

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const formatExpressionString = (leftOperand, op, rightOperand) => `(${leftOperand} ${op} ${rightOperand})`

const formatUnaryExpressionString = (leftOperand, op) => `(${op}${leftOperand})`

const isObject = operand => typeof operand === 'object'

const orderOperands = (l, r) => isObject(l) ? [r, l] : [l, r]

const isNode = item => typeof item === 'object'

const isQuote = op => op === 'quote'

const ast2strExpression = ast => {
    const { op, operands } = ast
    const [originalLeftOperand, originalRightOperand] = operands
    const [leftOperand, rightOperand] = orderOperands(originalLeftOperand, originalRightOperand)
    let newRightOperand = rightOperand
    let newLeftOperand = leftOperand

    if (isQuote(op)) {
        newRightOperand = isNode(newRightOperand) ? `"${ast2strExpression(newRightOperand)}"` : `"${newLeftOperand}"`
    }
    else {
        if (isNode(newRightOperand)) newRightOperand = ast2strExpression(rightOperand)
        if (isNode(newLeftOperand)) newLeftOperand = ast2strExpression(leftOperand)
    }

    if (isObject(originalLeftOperand) && !isQuote(op)) {
        return formatExpressionString(newRightOperand, op, newLeftOperand)
    } else if (!rightOperand && !isQuote(op)) {
        return formatUnaryExpressionString(newLeftOperand, op)
    } else if (isQuote(op)) {
        return newRightOperand || newLeftOperand
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