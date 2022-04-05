'use strict'

const { parser } = require('../parser')
const { execute } = require('../execute')
const { evaluate } = require('../evaluate')
const logger = require('../../../shared/logger')

const isActionAst = ({ type }) => type === 'instruction'

/**
 * @param {Object} options
 * @param {Array<String>} options.args
 * @param {Object} options.fileInfo
 */
const process = args => {
    try {
        const ast = parser(args)
        logger(ast) // only for debug
        return isActionAst(ast) ? execute(ast) : evaluate(ast)
    } catch (error) {
        return error.message
    }
}

module.exports = { process }