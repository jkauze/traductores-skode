'use strict'

const typeMapper = {
    number: 'int',
    boolean: 'bool'
}

const validateArrayItemsInt = array => array.reduce((prev, act) => {
    return typeMapper[typeof act] === 'int' && prev
}, true)

const validateArrayItemsBool = array => array.reduce((prev, act) => {
    return typeMapper[typeof act] === 'bool' && prev
}, true)

const getArrayType = array => validateArrayItemsInt(array) ? 'int' : validateArrayItemsBool(array) ? 'bool' : undefined

/**
 * get type of exp
 * @param {Any}
 * @param {Boolean}
 * @returns {Number}
 */
const type = (value, isArray) => isArray ? `[${getArrayType(JSON.parse(value))}]` : typeMapper[typeof value]

module.exports = { type }