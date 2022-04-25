'use strict'

const data = require('../data')

/**
 * reset memory data
 * @returns {bool}
 */
const reset = () => {
    Object.keys(data).forEach(key => delete data[key]);
    return true
}

module.exports = { reset }