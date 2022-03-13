'use strict'

const { ast2str } = require('../index')
const { case1, case2, case3, case4, case5, case6 } = require('./fixtures/cases')

const assert = require('assert');

describe('#ast2str', () => {
    it('Case 1: (1 + 2)', () => {
        const input = case1

        const actual = ast2str(input)

        const expected = '(1 + 2)'
        assert.equal(actual, expected, 'should convert the correct ast');
    });

    it('Case 2: (1 + (2 * (2 * (2 * 3))))', () => {
        const input = case2

        const actual = ast2str(input)

        const expected = '(1 + (2 * (2 * (2 * 3))))'
        assert.equal(actual, expected, 'should convert the correct ast');
    });

    it('Case 3: def(Boolean, id, value)', () => {
        const input = case3

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, value)'
        assert.equal(actual, expected, 'should convert the correct ast');
    });

    it('Case 4: asg(id, value)', () => {
        const input = case4

        const actual = ast2str(input)

        const expected = 'asg(id, value)'
        assert.equal(actual, expected, 'should convert the correct ast');
    });

    it('Case 5: asg(id, (1 + 2))', () => {
        const input = case5

        const actual = ast2str(input)

        const expected = 'asg(id, (1 + 2))'
        assert.equal(actual, expected, 'should convert the correct ast');
    });

    it('Case 6: def(Boolean, id, (1 + 2))', () => {
        const input = case6

        const actual = ast2str(input)

        const expected = 'def(Boolean, id, (1 + 2))'
        assert.equal(actual, expected, 'should convert the correct ast');
    });
});
