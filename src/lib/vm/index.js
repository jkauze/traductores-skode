'use strict'

const { lexer } = require('./lexer');
const { parser } = require('./parser');
const { ast2str } = require('./ast2str');
const { process } = require('./process');
const { execute } = require('./execute');
const { evaluate } = require('./evaluate');

module.exports = {
    lexer,
    parser,
    ast2str,
    process,
    execute,
    evaluate
}