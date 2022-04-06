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

const getIdType = (lvalue, isId) => isId ? typeMapper[typeof lvalue] : 'NOT_ASSIGNABLE_ERROR'

/**
 * get ltype of assignable lvalue
 * @param {Any}
 * @param {Boolean}
 * @returns {Number}
 */
const ltype = (lvalue, isArray, isId) => isArray ? `[${getArrayType(JSON.parse(lvalue))}]` : getIdType(lvalue, isId)

module.exports = { ltype }