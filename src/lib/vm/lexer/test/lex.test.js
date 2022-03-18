'use strict'

const { lexer } = require('../index')

const assert = require('assert');

describe('#lex:', function () {
    it('Case 1: 1+2+3a', function () {
        const input = '1+2+3a'

        const actual = lexer(input)

        const expected = 'TkNumber(1),TkPlus,TkNumber(2),TkPlus,TkNumber(3),TkId("a")'
        assert.equal(actual, expected, 'should be TkNumber(1),TkPlus,TkNumber(2),TkPlus,TkNumber(3),TkId("a") ');
    });
});
