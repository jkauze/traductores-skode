'use strict'

const { evaluate } = require('../index')
const cases = require('./fixtures/cases')
const updateMem = require('./fixtures/updateMem')
const setupExpected = require('./fixtures/setupExpected')

const assert = require('assert');

describe('#evaluate', () => {
    before("setup data", () => {
        updateMem('xx', 1, 'num')
        updateMem('yy', 2, 'num')
        updateMem('zz', 3, 'num')
    })

    it("Case 1: 1 + 2 = 3", () => {
        const input = cases.case1

        const actual = evaluate(input)

        const expected = setupExpected('3')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 2: (1 + (2 * (2 * (2 * 3)))) = 25", () => {
        const input = cases.case2

        const actual = evaluate(input)

        const expected = setupExpected('25')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 3: ((yy - zz) + xx) = 0", () => {
        const input = cases.case3

        const actual = evaluate(input)

        const expected = setupExpected('0')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 4: ((xx - yy) + zz) = 2", () => {
        const input = cases.case4

        const actual = evaluate(input)

        const expected = setupExpected('2')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 5: (+yy) = 2", () => {
        const input = cases.case5

        const actual = evaluate(input)

        const expected = setupExpected('2')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 6: ((+yy) - xx) = 1", () => {
        const input = cases.case6

        const actual = evaluate(input)

        const expected = setupExpected('1')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 7:  ((yy + xx) - zz) = 0", () => {
        const input = cases.case7

        const actual = evaluate(input)

        const expected = setupExpected('0')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 8:  (yy + (xx - zz)) = 0", () => {
        const input = cases.case8

        const actual = evaluate(input)

        const expected = setupExpected('0')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 9: [1+2] = [3]", () => {
        const input = cases.case9

        const actual = evaluate(input)

        const expected = setupExpected('[3]')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 10: [1] = [1]", () => {
        const input = cases.case10

        const actual = evaluate(input)

        const expected = setupExpected('[1]')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

    it("Case 11: [] = []", () => {
        const input = cases.case11

        const actual = evaluate(input)

        const expected = setupExpected('[]')
        assert.deepEqual(actual, expected, 'should return correct value response');
    });

});