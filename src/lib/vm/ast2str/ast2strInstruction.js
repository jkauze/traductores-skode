'use strict'

const { logger } = require('../../../shared')
const ast2strExpression = require('./ast2strExpression')
const hasChild = require('./hasChild')

const isTypeDefinition = type => !!type

const isObject = operand => typeof operand === 'object'

const formatExpression = (expression) => Array.isArray(expression) ? `[${expression}]` : expression

const getAssignmentString = (id, expression) =>`asg(${id}, ${formatExpression(expression)})`

const getDefinitionString = (type, id, expression) => `def(${type}, ${id}, ${formatExpression(expression)})`

const formatInstructionString = (id, expression, type) => isTypeDefinition(type)
    ? getDefinitionString(type, id, expression)
    : getAssignmentString(id, expression)


/**
 * @param {Object} ast 
 * @returns {String} formatted ast instruction to string
 */
const ast2strInstruction = ast => {
    const { operands } = ast
    const [id, expression, type] = operands
    let newExpression = expression

    if (hasChild(operands)) {
        if (!isObject(id)) newExpression = ast2strExpression(expression)
        if (isObject(expression)) newExpression = ast2strExpression(expression)
    }

    return formatInstructionString(isObject(id) ? ast2strExpression(id): id, newExpression, type)
}

module.exports = ast2strInstruction