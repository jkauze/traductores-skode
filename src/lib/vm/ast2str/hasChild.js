'use strict'

const isObject = operand => typeof operand === 'object'

/**
 * verify if some operands is an expression
 * @param {Array<String||Object>} operands 
 * @returns 
 */
const hasChild = operands => operands.some(isObject)

module.exports = hasChild