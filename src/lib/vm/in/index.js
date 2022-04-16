'use strict'

const invalidLogarithm = () => 'Has not logarithm'

/**
 * get Logarithm of value
 * @param {Number}
 * @returns {Number}
 */
const inFunction = value => {
    const result = Math.log(value)
    if (!isNaN(result) && typeof result === 'number') return result
    else throw new Error(invalidLogarithm())
}

module.exports = { inFunction }