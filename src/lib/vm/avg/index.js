'use strict'

const sumReducer = (accumulated, actual) => accumulated + actual

/**
 * get avg of array items
 * @param {[Number]}
 * @returns {Number}
 */
const avg = operands => operands.reduce(sumReducer, 0) / (operands.length);

module.exports = { avg }