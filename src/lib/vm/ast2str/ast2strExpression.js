'use strict'

const logger = require('../../../shared/logger')

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const formatExpressionString = (leftOperand, op, rightOperand) => `(${leftOperand} ${op} ${rightOperand})`

const formatUnaryExpressionString = (leftOperand, op) => `(${op}${leftOperand})`

const formatFunctionString = (op, operands) => (operands) ? `${op}(${reduceFunctionArgs(operands)})` : `${op}()`

const reduceFunctionArgs = (operands) => formatFunctionArgsString(operands.map(operand => isNode(operand) ? executeAST2Expression(operand) : operand ))
    
const formatFunctionArgsString = (operands) => operands.reduce((strings, string) => `${strings},${string}`)

const orderOperands = (l, r) => isNode(l) ? isArray(l) ? [l, r] : [r, l] : [l, r]

const isNode = item => typeof item === 'object'

const isArray = item => Array.isArray(item)

const isQuote = op => op === 'quote'

const isIndex = op => op ==='index'

const mapperFunction = {
    if:true, type:true, ltype:true, reset:true, uniform:true, floor:true, 
    length:true, sum:true, avg:true, pi:true, now:true, ln:true, exp:true, 
    sin:true, cos:true, formula:true, tick:true, array:true, histogram: true,
    sqrt:true
}

const isFunction = op => mapperFunction[op] || false

const ast2strExpression = ast => {
    const op = ast.op
    const operands = ast?.operands
    
    if (operands) {
        const [originalLeftOperand, originalRightOperand] = operands
        const [leftOperand, rightOperand] = orderOperands(originalLeftOperand, originalRightOperand)
        let newRightOperand = rightOperand
        let newLeftOperand = leftOperand

        if (op === "function") throw new Error(`Funcion no implementada: ${leftOperand}`)

        if (isFunction(op)) return formatFunctionString(op, operands)

        if (isIndex(op)){
            if (isNode(newRightOperand)) newRightOperand = executeAST2Expression(rightOperand)
            if (isNode(newLeftOperand)) newLeftOperand = executeAST2Expression(leftOperand)
            return `${newLeftOperand}[${newRightOperand}]`
        }

        if (isQuote(op)) {
            newRightOperand = isNode(newRightOperand) ? `${ast2strExpression(newRightOperand)}` : `${newLeftOperand}`
            return newRightOperand || newLeftOperand
        }
        
        if (isNode(newRightOperand)) newRightOperand = ast2strExpression(rightOperand)
        if (isNode(newLeftOperand)) newLeftOperand = ast2strExpression(leftOperand)

        if (originalRightOperand === undefined) return formatUnaryExpressionString(newLeftOperand ? newLeftOperand : newRightOperand, op)
        
        if (isNode(originalLeftOperand)) return formatExpressionString(newRightOperand, op, newLeftOperand)
        else return formatExpressionString(newLeftOperand, op, newRightOperand)
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
    isArray(ast) ? formatExpression(ast2strArrayExpression(ast)) : ast2strExpression(ast)
)

module.exports = executeAST2Expression