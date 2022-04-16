'use strict'

const { debug } = process.env

const { parser } = require('../parser')
const { execute } = require('../execute')
const { evaluate } = require('../evaluate')
const logger = require('../../../shared/logger')

const isActionAst = ({ type }) => type === 'instruction'

const getErrorMessage = (error) => Object.getOwnPropertyDescriptor(error, 'found') ? error.found || '' : error.message

/**
 * @param {Object} options
 * @param {Array<String>} options.args
 * @param {Object} options.fileInfo
 */
const processVM = args => {
    try {
        const ast = parser(args)
        if (debug) logger(ast)
        return isActionAst(ast) ? execute(ast) : evaluate(ast)
    } catch (error) {
        const errorMessage = getErrorMessage(error)
        return errorMessage
    }
}

module.exports = { process: processVM }