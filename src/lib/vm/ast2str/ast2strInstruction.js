'use strict'

const ast2strExpression = require('./ast2strExpression')
const hasChild = require('./hasChild')

const isTypeDefinition = type => !!type

const getAssignmentString = (id, expression) => (
    `asg(${id}, ${expression})`
)

const getDefinitionString = (type, id, expression) => (
    `def(${type}, ${id}, ${expression})`
)

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

    if (hasChild(operands)) newExpression = ast2strExpression(expression)

    return formatInstructionString(id, newExpression, type)
}

module.exports = ast2strInstruction