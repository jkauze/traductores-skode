'use strict'

/**
 * get int of double
 * @param {Number}
 * @returns {Number}
 */
const floor = value => Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value, 10)

module.exports = { floor }