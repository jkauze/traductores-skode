'use strict'

const invalidCos = () => 'Unable to get Cos of the value'

/**
 * get Cos of value
 * @param {Number}
 * @returns {Number}
 */
const cos = value => {
    const result = Math.cos(value)
    if (!isNaN(result) && typeof result === 'number') return result
    else throw new Error(invalidCos())
}

module.exports = { cos }