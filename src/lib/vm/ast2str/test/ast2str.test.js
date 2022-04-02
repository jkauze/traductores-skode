'use strict'

const { ast2str } = require('../index')
const cases = require('./fixtures/cases')

const assert = require('assert');

describe('#ast2str', () => {
    it('Case 1: (1 + 2)', () => {
        const input = cases.case1

        const actual = ast2str(input)

        const expected = '(1 + 2)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 2: (1 + (2 * (2 * (2 * 3))))', () => {
        const input = cases.case2

        const actual = ast2str(input)

        const expected = '(1 + (2 * (2 * (2 * 3))))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 3: def(Boolean, id, value)', () => {
        const input = cases.case3

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, value)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 4: asg(id, value)', () => {
        const input = cases.case4

        const actual = ast2str(input)

        const expected = 'asg(id, value)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 5: asg(id, (1 + 2))', () => {
        const input = cases.case5

        const actual = ast2str(input)

        const expected = 'asg(id, (1 + 2))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 6: def(Boolean, id, (1 + 2))', () => {
        const input = cases.case6

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, (1 + 2))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 7: ((y + z) + x)', () => {
        const input = cases.case7

        const actual = ast2str(input)

        const expected = '((y - z) + x)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 8: (x - y) + z)', () => {
        const input = cases.case8

        const actual = ast2str(input)

        const expected = '((x - y) + z)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 9: (+y)', () => {
        const input = cases.case9

        const actual = ast2str(input)

        const expected = '(+y)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 10: ((+y) - x)', () => {
        const input = cases.case10

        const actual = ast2str(input)

        const expected = '((+y) - x)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 11: ((y + x) - z)', () => {
        const input = cases.case11

        const actual = ast2str(input)

        const expected = '((y + x) - z)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 12: (y + (x - z))', () => {
        const input = cases.case12

        const actual = ast2str(input)

        const expected = '(y + (x - z))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 13: asg(x, [1+1,2])', () => {
        const input = cases.case13

        const actual = ast2str(input)

        const expected = 'asg(x, [(1 + 1),2])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 14: def(Boolean, x, [1,(2 + 1)])', () => {
        const input = cases.case14

        const actual = ast2str(input)

        const expected = 'def(Boolean, x, [1,(2 + 1)])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 15: def(Boolean, x, [1,2,3,4])', () => {
        const input = cases.case15

        const actual = ast2str(input)

        const expected = 'def(Boolean, x, [1,2,3,4])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 16: [1+2])', () => {
        const input = cases.case16

        const actual = ast2str(input)

        const expected = '[(1 + 2)]'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 17: [1])', () => {
        const input = cases.case17

        const actual = ast2str(input)

        const expected = '[1]'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 18: ((+1) + (-1)))', () => {
        const input = cases.case18

        const actual = ast2str(input)

        const expected = '((+1) + (-1))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 19: [])', () => {
        const input = cases.case19

        const actual = ast2str(input)

        const expected = '[]'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 20: x := 3 = 3 && true', () => {
        const input = cases.case20

        const actual = ast2str(input)

        const expected = 'def(Boolean, x, (((3 = 3) && true) || (!true)))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 21: x < y + 3 = 35', () => {
        const input = cases.case21

        const actual = ast2str(input)

        const expected = '((x < (y + 3)) = 35)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 22: y / w', () => {
        const input = cases.case22

        const actual = ast2str(input)

        const expected = '"(y / w)"'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    //
    it('Case 23: z = x + "y / w"', () => {
        const input = cases.case23

        const actual = ast2str(input)

        const expected = '(z = (x + "(y / w)"))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });
});