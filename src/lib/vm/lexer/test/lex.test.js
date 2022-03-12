'use strict'

const { parser } = require('../index')

const assert = require('assert');

describe('#Sample: lex function', function () {
    it('Caso 1: 1+2+3a', function () {
        const input = '1+2+3a'

        const actual = parser(input)

        const expected = 'TkNumber(1),TkPlus,TkNumber(2),TkPlus,TkNumber(3),TkId("a")'
        assert.equal(actual, expected, 'should be TkNumber(1),TkPlus,TkNumber(2),TkPlus,TkNumber(3),TkId("a") ');
    });
});
