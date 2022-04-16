'use strict'

const invalidExp = () => 'Unable to get Exp of the value'

/**
 * get Exp of value
 * @param {Number}
 * @returns {Number}
 */
const exp = value => {
    const result = Math.exp(value)
    if (!isNaN(result) && typeof result === 'number') return result
    else throw new Error(invalidExp())
}

module.exports = { exp }