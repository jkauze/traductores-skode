'use strict'

const sumReducer = (accumulated, actual) => accumulated + actual

/**
 * get sum of array items
 * @param {[Number]}
 * @returns {Number}
 */
const sum = operands => operands.reduce(sumReducer, 0);

module.exports = { sum }