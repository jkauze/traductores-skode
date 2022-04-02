'use strict'

const { execute } = require('../index')
const cases = require('./fixtures/cases')
const setupExpected = require('./fixtures/setupExpected')

const assert = require('assert');

describe('#execute', () => {
    it("Case 1: def(Num execute1 := 10)", () => {
        const input = cases.case1

        const actual = execute(input)

        const expected = setupExpected('Num execute1 := 10')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 2: asg(execute1 := 20)", () => {
        const input = cases.case2

        const actual = execute(input)

        const expected = setupExpected('execute1 := 20')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 3: asg(execute1, (1 + 2))", () => {
        const input = cases.case3

        const actual = execute(input)

        const expected = setupExpected('execute1 := 3')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 4: def(Boolean, executefail1, 3) - TypeError", () => {
        const input = cases.case4

        const actual = execute(input)

        const expected = setupExpected('TypeError: "3" is not "Boolean" type', 'ERROR')
        assert.deepEqual(actual, expected, 'should return TypeError');
    });
});