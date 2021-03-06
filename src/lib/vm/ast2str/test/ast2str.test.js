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

    it('Case 3: def(bool, id, value)', () => {
        const input = cases.case3

        const actual = ast2str(input)

        const expected = 'def(bool, id, value)'
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

    it('Case 6: def(bool, id, (1 + 2))', () => {
        const input = cases.case6

        const actual = ast2str(input)

        const expected = 'def(bool, id, (1 + 2))'
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

    it('Case 14: def(bool, x, [1,(2 + 1)])', () => {
        const input = cases.case14

        const actual = ast2str(input)

        const expected = 'def(bool, x, [1,(2 + 1)])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 15: def(bool, x, [1,2,3,4])', () => {
        const input = cases.case15

        const actual = ast2str(input)

        const expected = 'def(bool, x, [1,2,3,4])'
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

        const expected = 'def(bool, x, (((3 = 3) && true) || (!true)))'
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

    it('Case 23: z = x + "y / w"', () => {
        const input = cases.case23

        const actual = ast2str(input)

        const expected = '(z = (x + "(y / w)"))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 24: "y" + 1', () => {
        const input = cases.case24

        const actual = ast2str(input)

        const expected = '("y" + 1)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 25: if(x,a[0],1)', () => {
        const input = cases.case25

        const actual = ast2str(input)

        const expected = 'if(x,a[0],1)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 26: reset()', () => {
        const input = cases.case26

        const actual = ast2str(input)

        const expected = 'reset()'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 27: [1,2,3][1]', () => {
        const input = cases.case27

        const actual = ast2str(input)

        const expected = '[1,2,3][1]'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 28: [1,2,3][1] * x', () => {
        const input = cases.case28

        const actual = ast2str(input)

        const expected = '([1,2,3][1] * x)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 29: [1,2,3][1*2^6] * a[1]', () => {
        const input = cases.case29

        const actual = ast2str(input)

        const expected = '([1,2,3][(1 * (2 ^ 6))] * a[1])'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 30: ltype(2<=3 && false)', () => {
        const input = cases.case30

        const actual = ast2str(input)

        const expected = 'ltype(((2 <= 3) && false))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 31: valor[i + 1] := true;', () => {
        const input = cases.case31

        const actual = ast2str(input)

        const expected = 'asg(valor[(i + 1)], true)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it("Case 32: num k := 'floor(100 * uniform())'", () => {
        const input = cases.case32

        const actual = ast2str(input)

        const expected = 'def(num, k, "floor((100 * uniform()))")'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 33: -( 1+2 )', () => {
        const input = cases.case33

        const actual = ast2str(input)

        const expected = '(-(1 + 2))'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 34: true && false', () => {
        const input = cases.case34

        const actual = ast2str(input)

        const expected = '(true && false)'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });

    it('Case 35: -pi() + pi()', () => {
        const input = cases.case35

        const actual = ast2str(input)

        const expected = '((-pi()) + pi())'
        assert.deepEqual(actual, expected, 'should convert the correct ast');
    });
});