'use strict'

const { parser, ast2str } = require('../../../vm')
const util = require('util')
const { fatalErrorMessage, okASTMessage } = require('../../utils/messages')

/**
 * @param {Object} options 
 * @param {Array<String>} options.args 
 * @param {Object} options.fileInfo
 * @returns {String} aststr 
 */
const testParser = ({ args, fileInfo }) => {
    const formatedArgs = args.join(' ')
    const ast = parser(args)
    // console.log(ast.operands)
    console.log(util.inspect(ast, false, null, true))
    // const aststr = ast2str(ast)
    try {
        //okASTMessage(formatedArgs, aststr)
    } catch (error) {
        console.log(error)
        fatalErrorMessage({ error: error.found, fileInfo })
    }
    return;
}

module.exports = testParser