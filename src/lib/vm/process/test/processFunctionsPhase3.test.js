'use strict'

const { process } = require('../index')
const functionsCases = require('./fixtures/functionsCases')

const assert = require('assert');

describe('#process - functions cases (phase 3) - success', () => {
    it("Case 1: uniform()", () => {
        const input = functionsCases.case1

        const actual = process(input)
        const { status, message } = actual
        
        const expectedStatus = 'OK'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.ok(parseFloat(message) >= 0 && parseFloat(message) <= 1, 'should get correct value');
    });

    it("Case 2: uniform(1,2,[2],xxx)", () => {
        const input = functionsCases.case2

        const actual = process(input)
        const { status, message } = actual
        
        const expectedStatus = 'OK'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.ok(parseFloat(message) >= 0 && parseFloat(message) <= 1, 'should get correct value');
    });

    it("Case 3: floor(100 * uniform())", () => {
        const input = functionsCases.case3

        const actual = process(input)
        const { status, message } = actual
        
        const expectedStatus = 'OK'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.ok(parseFloat(message) >= 0 && parseFloat(message) <= 100, 'should get correct value');
    });

    it("Case 4: type(xdebug)", () => {
        const input = functionsCases.case4

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 'int'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 5: type([1,2])", () => {
        const input = functionsCases.case5

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = '[int]'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 6: type(true && false)", () => {
        const input = functionsCases.case6

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 'bool'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 7: type([1,2,3][0])", () => {
        const input = functionsCases.case7

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 'int'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 8: type([1,2,3][3 - 3])", () => {
        const input = functionsCases.case8

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 'int'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 9: ltype(xdebug)", () => {
        const input = functionsCases.case9

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 'int'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 10: sum([1+10, 2*2])", () => {
        const input = functionsCases.case10

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 15
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 11: sum([1+10, true])", () => {
        const input = functionsCases.case11

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 12
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 12: length([1,2,xdebug, 1/1])", () => {
        const input = functionsCases.case12

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 4
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 13: avg([2+2, 2*2, 8/2])", () => {
        const input = functionsCases.case13

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 4
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 14: pi()", () => {
        const input = functionsCases.case14

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 3.141592653589793
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 15: pi([1,2])", () => {
        const input = functionsCases.case15

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 3.141592653589793
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 16: now()", () => {
        const input = functionsCases.case16

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = Date.now()
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 17: now(1,2)", () => {
        const input = functionsCases.case17

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = Date.now()
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it.skip("Case 18: num functionDebug := 'floor(sum([50,50]) * uniform())';", () => {
        const input = functionsCases.case18

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 10
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it.skip("Case 19: floor(uniform() * uniform())", () => {
        const input = functionsCases.case19

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 10
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });
});
