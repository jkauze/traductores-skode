'use strict'

const { parser, ast2str } = require('../../../vm')
const logger = require('../../../../utils/logger')
const { fatalErrorMessage, okASTMessage } = require('../../utils/messages')

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
        const aststr = ast2str(ast)
        logger(ast) // only for debug
        return okASTMessage(formatedArgs, aststr)
    } catch (error) {
        return fatalErrorMessage({ error: error.message, fileInfo })
    }
}

module.exports = testParser