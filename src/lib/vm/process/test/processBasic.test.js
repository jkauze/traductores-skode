'use strict'

const { process } = require('../index')
const basicCases = require('./fixtures/basicCases')

const assert = require('assert');

describe('#process - basic cases - success', () => {
    it("Case 1: 1", () => {
        const input = basicCases.case1

        const actual = process(input)

        const expected = { status: 'OK', message: 1 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 2: xdebug", () => {
        const input = basicCases.case2

        const actual = process(input)

        const expected = { status: 'OK', message: 6 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 3: !1", () => {
        const input = basicCases.case3

        const actual = process(input)

        const expected = { status: 'OK', message: false }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 4: !xdebug", () => {
        const input = basicCases.case4

        const actual = process(input)

        const expected = { status: 'OK', message: false }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 5: +1 + -1", () => {
        const input = basicCases.case5

        const actual = process(input)

        const expected = { status: 'OK', message: 0 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 6: !xdebug && -ydebug", () => {
        const input = basicCases.case6

        const actual = process(input)

        const expected = { status: 'OK', message: 0 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 7: (1+2)", () => {
        const input = basicCases.case7

        const actual = process(input)

        const expected = { status: 'OK', message: 3 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 8: [1+2]", () => {
        const input = basicCases.case8

        const actual = process(input)

        const expected = { status: 'OK', message: "[3]" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 9: []", () => {
        const input = basicCases.case9

        const actual = process(input)

        const expected = { status: 'OK', message: "[]" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 10: [,]", () => {
        const input = basicCases.case10

        const actual = process(input)

        const expected = { status: 'OK', message: "[]" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 11: [1,2,3]", () => {
        const input = basicCases.case11

        const actual = process(input)

        const expected = { status: 'OK', message: "[1,2,3]" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 12: [!xdebug,2+2]", () => {
        const input = basicCases.case12

        const actual = process(input)

        const expected = { status: 'OK', message: "[false,4]" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 13: [num] x := []", () => {
        const input = basicCases.case13

        const actual = process(input)

        const expected = { status: 'ACK', message: "[num] xdebug := [];" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 14: num xdebug := 20+3", () => {
        const input = basicCases.case14

        const actual = process(input)

        const expected = { status: 'ACK', message: "num xdebug := 23;" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 15: xdebug := 20 + 2", () => {
        const input = basicCases.case15

        const actual = process(input)

        const expected = { status: 'ACK', message: "xdebug := 22;" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 16: 1+2-3*4/5^6", () => {
        const input = basicCases.case16

        const actual = process(input)

        const expected = { status: 'OK', message: "2.999232" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 17: (1 + 2) * 4^6 - (4+1)/5", () => {
        const input = basicCases.case17

        const actual = process(input)

        const expected = { status: 'OK', message: "12287" }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 18: num xdebug2 := 'xdebug'", () => {
        const input = basicCases.case18

        const actual = process(input)

        const expected = { status: 'ACK', message: 'num xdebug2 := "xdebug";' }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
});

describe('#process - functions cases - success', () => {
    it("Case 1: uniform()", () => {
        const input = basicCases.case1

        const actual = process(input)

        const expected = { status: 'OK', message: 1 }
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
});
