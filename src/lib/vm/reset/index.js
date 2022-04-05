'use strict'

const data = require('../data')

/**
 * reset memory data
 * @returns {Boolean}
 */
const reset = () => {
    Object.keys(data).forEach(key => delete data[key]);
    return true
}

module.exports = { reset }