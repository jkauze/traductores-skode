'use strict'

const { parser, ast2str } = require('../../../vm')
const { lexErrorMessage, okMessage } = require('../../utils/messages')
const util = require('util') 

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {String} aststr 
 */
const testParser = ({ args, fileInfo }) => {
    const formatedArgs = args.join(' ')
    try {
        const ast = parser(formatedArgs)
        const aststr = ast2str(ast)
        okMessage(formatedArgs, aststr)
        console.log(util.inspect(aststr, false, null, true)) 
    } catch (error) {
        console.log(error)
        lexErrorMessage({ error: error.found, fileInfo })
    }
    return;
}

module.exports = testParser