'use strict'

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const formatExpressionString = (leftOperand, op, rightOperand) => `(${leftOperand} ${op} ${rightOperand})`

const formatUnaryExpressionString = (leftOperand, op) => `(${op}${leftOperand})`

const formatFunctionString = (op, operands) => (operands) ? `${op}(${formatFunctionArgsString(operands)})` : `${op}()`

const formatFunctionArgsString = (operands) => operands.reduce((formatedString, String) => { return `${formatedString}, ${String}` })

const isObject = operand => typeof operand === 'object'

const orderOperands = (l, r) => isObject(l) ? [r, l] : [l, r]

const isNode = item => typeof item === 'object'

const isQuote = op => op === 'quote'

const mapperFunction = {if:true, type:true, itype:true, reset:true, uniform:true, floor:true, length:true, sum:true, avg:true, pi:true, now:true}

const isFunction = op => mapperFunction[op] || false

const ast2strExpression = ast => {
    const op = ast.op
    const operands = ast?.operands
    
    if (operands) {
        const [originalLeftOperand, originalRightOperand] = operands
        const [leftOperand, rightOperand] = orderOperands(originalLeftOperand, originalRightOperand)
        let newRightOperand = rightOperand
        let newLeftOperand = leftOperand

        if (isFunction(op)) {
            return formatFunctionString(op, operands)
        }
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
    else {
        return formatFunctionString(op)
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