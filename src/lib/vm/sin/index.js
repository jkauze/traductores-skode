'use strict'

const invalidSin = () => 'Unable to get Sin of the value'

/**
 * get Sin of value
 * @param {Number}
 * @returns {Number}
 */
const sin = value => {
    const result = Math.sin(value)
    if (!isNaN(result) && typeof result === 'number') return result
    else throw new Error(invalidSin())
}

module.exports = { sin }