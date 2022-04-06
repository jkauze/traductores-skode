'use strict'

const { statusTypes } = require('../../../shared')
const { ackMessage, okMessage, errorMessage, fatalErrorMessage } = require('../utils/messages')

const sendProcessMessage = (input, { status, message }, fileInfo) => {
    if (status === statusTypes.ACK) ackMessage(message)
    if (status === statusTypes.OK) okMessage(input, message)
    if (status === statusTypes.ERROR) errorMessage({input, error: message, fileInfo})
}

/**
 * @param {String} input 
 * @param {Object} response 
 * @param {Object} fileInfo 
 * @returns 
 */
const print = (input, response, fileInfo) => typeof response === 'object' ?
    sendProcessMessage(input, response, fileInfo) :
    fatalErrorMessage({error: response, fileInfo, input})

module.exports = print