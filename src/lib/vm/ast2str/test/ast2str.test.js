'use strict'

const { ast2str } = require('../index')
const {
    case1,
    case2,
    case3,
    case4,
    case5,
    case6,
    case7,
    case8,
    case9,
    case10,
    case11,
    case12,
    case13,
    case14,
    case15,
    case16,
    case17
} = require('./fixtures/cases')

const assert = require('assert');

describe('#ast2str', () => {
    it('Case 1: (1 + 2)', () => {
        const input = case1

        const actual = ast2str(input)

        const expected = '(1 + 2)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 2: (1 + (2 * (2 * (2 * 3))))', () => {
        const input = case2

        const actual = ast2str(input)

        const expected = '(1 + (2 * (2 * (2 * 3))))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 3: def(Boolean, id, value)', () => {
        const input = case3

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, value)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 4: asg(id, value)', () => {
        const input = case4

        const actual = ast2str(input)

        const expected = 'asg(id, value)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 5: asg(id, (1 + 2))', () => {
        const input = case5

        const actual = ast2str(input)

        const expected = 'asg(id, (1 + 2))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 6: def(Boolean, id, (1 + 2))', () => {
        const input = case6

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, (1 + 2))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 7: ((y + z) + x)', () => {
        const input = case7

        const actual = ast2str(input)

        const expected = '((y - z) + x)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 8: (x - y) + z)', () => {
        const input = case8

        const actual = ast2str(input)

        const expected = '((x - y) + z)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 9: (+y)', () => {
        const input = case9

        const actual = ast2str(input)

        const expected = '(+y)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 10: ((+y) - x)', () => {
        const input = case10

        const actual = ast2str(input)

        const expected = '((+y) - x)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 11: ((y + x) - z)', () => {
        const input = case11

        const actual = ast2str(input)

        const expected = '((y + x) - z)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 12: (y + (x - z))', () => {
        const input = case12

        const actual = ast2str(input)

        const expected = '(y + (x - z))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 13: asg(x, [1+1,2])', () => {
        const input = case13

        const actual = ast2str(input)

        const expected = 'asg(x, [(1 + 1),2])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 14: def(Boolean, x, [1,(2 + 1)])', () => {
        const input = case14

        const actual = ast2str(input)

        const expected = 'def(Boolean, x, [1,(2 + 1)])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 15: def(Boolean, x, [1,2,3,4])', () => {
        const input = case15

        const actual = ast2str(input)

        const expected = 'def(Boolean, x, [1,2,3,4])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 16: [1+2])', () => {
        const input = case16

        const actual = ast2str(input)

        const expected = ['(1 + 2)']
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 17: [1])', () => {
        const input = case17

        const actual = ast2str(input)

        const expected = ['1']
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });
});