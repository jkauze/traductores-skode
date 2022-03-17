'use strict'

const { parser } = require('../index')
const { case1, case2, case3 } = require('./fixtures/cases')

const assert = require('assert');

describe('#parser', () => {
    it('Case 1: [ 1 ]', () => {
        const input = case2

        const actual = parser(input)
        console.log(actual)

        const expected = {
                op: "+",
                operands: [
                    "1",
                    "1"
                ],
                type: "expression"
            }
        assert.equal(actual, expected, 'should convert the correct ast');
    });
});