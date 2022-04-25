'use strict'

const { debug } = process.env

const { parser } = require('../parser')
const { execute } = require('../execute')
const { evaluate } = require('../evaluate')
const { statusTypes } = require('../../../shared')
const logger = require('../../../shared/logger')
const formatResponse = require('../utils/formatResponse')

const isActionAst = ({ type }) => type === 'instruction'

const sendErrorMessage = (error) => Object.getOwnPropertyDescriptor(error, 'found')
    ? formatResponse('SyntaxError', statusTypes.ERROR)
    : formatResponse(error.message, statusTypes.ERROR)

/**
 * @param {Object} options
 * @param {Array<String>} options.args
 * @param {Object}
 */
const processVM = (args) => {
    try {
        const ast = parser(args)
        if (debug) logger(ast)
        return isActionAst(ast) ? execute(ast) : evaluate(ast)
    } catch (error) {
        return sendErrorMessage(error)
    }
}

module.exports = { process: processVM }