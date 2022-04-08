'use strict'

const { debug } = process.env

const { parser, ast2str } = require('../../../vm')
const logger = require('../../../../shared/logger')
const { astErrorMessage, okASTMessage } = require('../../utils/messages')

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {String} aststr 
 */
const testParser = ({ args, fileInfo }) => {
    const formatedArgs = args.join(' ')
    try {
        const ast = parser(args)
        if (debug) logger(ast) // only for debug
        const aststr = ast2str(ast)
        return okASTMessage(formatedArgs, aststr)
    } catch (error) {
        return astErrorMessage({ error: error.found, fileInfo, input: formatedArgs })
    }
}

module.exports = testParser