'use strict'

const { parser, ast2str } = require('../../../vm')
const { fatalErrorMessage, okMessage } = require('../../utils/messages')

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {String} aststr 
 */
const testParser = ({ args, fileInfo }) => {
    try {
        const formatedArgs = args.join(' ')
        const ast = parser(args)
        const aststr = ast2str(ast)
        okMessage(formatedArgs, aststr)
    } catch (error) {
        fatalErrorMessage({ error: error.found, fileInfo })
    }
    return;
}

module.exports = testParser