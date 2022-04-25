'use strict'


const reference = id => `Uncaught ReferenceError: "${id}" is not defined`

const invalidFunction = id => `Uncaught ReferenceError: "function ${id}" is not implemented or has invalid parameters. Type ".help" to get functions guide`

const objectIsNotIterable = (func, arg) => `Uncaught SyntaxError: Invalid or unexpected token ${arg} in function ${func}`

const objectIsIterable = (func, arg) => `Uncaught SyntaxError: Invalid or unexpected token [${arg}] in function ${func}`

const notLvalueError = () => 'The expression has no LVALUE'

const invalidTypeCondition = (guard) => `The guard "${guard}" is not boolean type`

const invalidSize = (size) => `The Size "${size} is not a valid number > 0`

module.exports = {
    reference,
    invalidSize,
    invalidFunction,
    objectIsNotIterable,
    objectIsIterable,
    notLvalueError,
    invalidTypeCondition
}