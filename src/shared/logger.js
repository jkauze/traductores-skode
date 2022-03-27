'use strict'

const util = require('util')

/**
 * @param {Object || String} obj 
 * @returns - full console log object
 */
const logger = (obj) => console.log(util.inspect(obj, false, null, true))

module.exports = logger

