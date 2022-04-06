'use strict'

/**
 * @param {String} message 
 * @param {[String]} status - Default: OK
 * @returns 
 */
const formatResponse = (message, status = 'OK') => ({ status, message })

module.exports = formatResponse