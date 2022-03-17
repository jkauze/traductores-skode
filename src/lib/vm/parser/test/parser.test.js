'use strict'

const { parser } = require('../index')
const { case1, case2, case3 } = require('./fixtures/cases')

const assert = require('assert');

describe.only('#parser', () => {
    it("Case 1: ('1 + 2')", () => {
        const input = case1

        const actual = parser(input)

        const expected = {
              op: "+",
              operands: [
                "1",
                "2"
              ],
              type: "expression"
            }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });

    it("Case 2: ('x + 1')", () => {
        const input = case2

        const actual = parser(input)

        const expected = {
              op: "+",
              operands: [
                "x",
                "1"
              ],
              type: "expression"
            }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
});