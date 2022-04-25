'use strict'

const { process } = require('../index')
const functionsCases = require('./fixtures/functionCases2')

const assert = require('assert');

describe('#process - functions cases (phase 4) - success', () => {
    it("Case 1: ln(10+1*2)", () => {
        const input = functionsCases.case1

        const actual = process(input)
        const { status, message } = actual
        const expectedStatus = 'OK'
        const expectedMessage = 2.4849066497880004
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 2: ln(uniform())", () => {
        const input = functionsCases.case2

        const actual = process(input)
        const { status, message } = actual
        
        const expectedStatus = 'OK'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.ok(parseFloat(message) >= -5 && parseFloat(message) <= 5, 'should get correct value');
    });

    it("Case 3: exp(10^2", () => {
        const input = functionsCases.case3

        const actual = process(input)
        const { status, message } = actual
        
        const expectedStatus = 'OK'
        const expectedMessage = 2.6881171418161356e+43
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 4: exp(floor(1.1))", () => {
        const input = functionsCases.case4

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 2.718281828459045
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 5: sin(floor(1.2 * 1))", () => {
        const input = functionsCases.case5

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 0.8414709848078965
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 6: cos(floor(1.2 * 1))", () => {
        const input = functionsCases.case6

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = 0.5403023058681398
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 7: formula(ydebug)", () => {
        const input = functionsCases.case7

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = '("xdebug" + 1)'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    it("Case 8: formula(zdebug)", () => {
        const input = functionsCases.case8

        const actual = process(input)
        const { status, message } = actual

        const expectedStatus = 'OK'
        const expectedMessage = '"(((xdebug + ydebug) + 1) + 2)"'
        assert.deepEqual(status, expectedStatus, 'should get correct status');
        assert.deepEqual(message, expectedMessage, 'should get correct value');
    });

    // it("Case 9: ltype(xdebug)", () => {
    //     const input = functionsCases.case9

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 'int'
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 10: sum([1+10, 2*2])", () => {
    //     const input = functionsCases.case10

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 15
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 11: sum([1+10, true])", () => {
    //     const input = functionsCases.case11

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 12
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 12: length([1,2,xdebug, 1/1])", () => {
    //     const input = functionsCases.case12

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 4
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 13: avg([2+2, 2*2, 8/2])", () => {
    //     const input = functionsCases.case13

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 4
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 14: pi()", () => {
    //     const input = functionsCases.case14

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 3.141592653589793
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 15: pi([1,2])", () => {
    //     const input = functionsCases.case15

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 3.141592653589793
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 16: now()", () => {
    //     const input = functionsCases.case16

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = Date.now()
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it("Case 17: now(1,2)", () => {
    //     const input = functionsCases.case17

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = Date.now()
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it.skip("Case 18: num functionDebug := 'floor(sum([50,50]) * uniform())';", () => {
    //     const input = functionsCases.case18

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 10
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });

    // it.skip("Case 19: floor(uniform() * uniform())", () => {
    //     const input = functionsCases.case19

    //     const actual = process(input)
    //     const { status, message } = actual

    //     const expectedStatus = 'OK'
    //     const expectedMessage = 10
    //     assert.deepEqual(status, expectedStatus, 'should get correct status');
    //     assert.deepEqual(message, expectedMessage, 'should get correct value');
    // });
});
