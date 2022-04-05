'use strict'

const data = require('../../../data')

/**
 * @param {String} id 
 * @param {String} value 
 * @param {String} type 
 * @returns 
 */
const updateMem = (id, value, type) => Object.assign(data, {
    [id]: {
        value,
        type
    }
})

module.exports = updateMem