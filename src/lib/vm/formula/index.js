'use strict'

const data = require('../data')
const ast2str = require('../ast2str')
 
const referenceError = id => `Uncaught ReferenceError: "${id}" is not defined`

const convertCValue = value => data[value] && ast2str(data[value]['value'])

const getIdCValue = value => {
    if (convertCValue(value)) return convertCValue(value) 
    else throw new Error(referenceError(value))
}

const isIdentifier = value => typeof value === 'string'

const getCValue = value => isIdentifier(value) ? getIdCValue(value) : value

/**
 * get Formula from assignable
 * @param {Number}
 * @returns {Number}
 */
const formula = (identifier) => getCValue(identifier)

module.exports = { formula }