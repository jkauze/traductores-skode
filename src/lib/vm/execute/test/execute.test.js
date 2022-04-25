'use strict'

const { execute } = require('../index')
const cases = require('./fixtures/cases')
const setupExpected = require('./fixtures/setupExpected')

const assert = require('assert');

describe('#execute', () => {
    it("Case 1: def(num execute1 := 10)", () => {
        const input = cases.case1

        const actual = execute(input)

        const expected = setupExpected('num execute1 := 10;')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 2: asg(execute1 := 20)", () => {
        const input = cases.case2

        const actual = execute(input)

        const expected = setupExpected('execute1 := 20;')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 3: asg(execute1, (1 + 2))", () => {
        const input = cases.case3

        const actual = execute(input)

        const expected = setupExpected('execute1 := 3;')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 4: def(bool, executefail1, 3) - TypeError", () => {
        const input = cases.case4

        const actual = execute(input)

        const expected = setupExpected('TypeError: "3" is not "bool" type;', 'ERROR')
        assert.deepEqual(actual, expected, 'should return TypeError');
    });

    it("Case 5: num lol := x", () => {
        const input = cases.case5

        const actual = execute(input)

        const expected = setupExpected('num lol := 6;')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 6: num lol := 'lol'", () => {
        const input = cases.case6

        const actual = execute(input)

        const expected = setupExpected('num lol2 := lol;')
        assert.deepEqual(actual, expected, 'should return correct value response');

        execute({
            op: ':=',
            type: 'instruction',
            operands: [
                'lol',
                20,
            ]
        })
        const actualChanged = execute(input)
        const expectedChanged = setupExpected('num lol2 := lol;')
        assert.deepEqual(actualChanged, expectedChanged, 'should return correct value response');

    });
});