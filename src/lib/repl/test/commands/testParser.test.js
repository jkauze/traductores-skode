'use strict'

const { testParser } = require('../../lib/commands/')
const cases = require('./fixtures/testParserCases')

const assert = require('assert');

describe('#testParser', () => {
    it("Case 1: 1", () => {
        const input = cases.case1

        const actual = testParser(input)

        const expected = 'OK: ast("1") ==> 1'
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 2: x", () => {
      const input = cases.case2

      const actual = testParser(input)

      const expected = 'OK: ast("xdebug") ==> xdebug'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 3: !1", () => {
      const input = cases.case3

      const actual = testParser(input)

      const expected = 'OK: ast("!1") ==> (!1)'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 4: !x", () => {
      const input = cases.case4

      const actual = testParser(input)

      const expected = 'OK: ast("!xdebug") ==> (!xdebug)'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 5: +1 + -1", () => {
      const input = cases.case5

      const actual = testParser(input)

      const expected = 'OK: ast("+1 + -1") ==> ((+1) + (-1))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 6: !x && -y", () => {
      const input = cases.case6

      const actual = testParser(input)

      const expected = 'OK: ast("!xdebug && -ydebug") ==> ((!xdebug) && (-ydebug))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 7: (1+2)", () => {
      const input = cases.case7

      const actual = testParser(input)

      const expected = 'OK: ast("(1+2)") ==> (1 + 2)'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 8: [1+2]", () => { // aqui
      const input = cases.case8

      const actual = testParser(input)

      const expected = 'OK: ast("[1+2]") ==> [(1 + 2)]'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 9: []", () => { // aqui
      const input = cases.case9

      const actual = testParser(input)

      const expected = 'OK: ast("[]") ==> []'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 10: [,]", () => {
      const input = cases.case10

      const actual = testParser(input)

      const expected = 'OK: ast("[,]") ==> []'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 11: [1,2,3]", () => {
      const input = cases.case11

      const actual = testParser(input)

      const expected = 'OK: ast("[1,2,3]") ==> [1,2,3]'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 12: [!x,2+2]", () => {
      const input = cases.case12

      const actual = testParser(input)

      const expected = 'OK: ast("[!xdebug,2+2]") ==> [(!xdebug),(2 + 2)]'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 13: [num] x := []", () => {
      const input = cases.case13

      const actual = testParser(input)

      const expected = 'OK: ast("[num] xdebug := []") ==> def(num, xdebug, [])'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 14: num x := 20+3", () => {
      const input = cases.case14

      const actual = testParser(input)

      const expected = 'OK: ast("num xdebug := 20+3") ==> def(num, xdebug, (20 + 3))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 15: x := 20 + 2", () => {
      const input = cases.case15

      const actual = testParser(input)

      const expected = 'OK: ast("xdebug := 20 + 2") ==> asg(xdebug, (20 + 2))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 16: 1+2-3*4/5^6", () => {
      const input = cases.case16

      const actual = testParser(input)

      const expected = 'OK: ast("1+2-3*4/5^6") ==> ((1 + 2) - ((3 * 4) / (5 ^ 6)))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 17: (1 + 2) * 4^6 - {4+1}/5", () => {
      const input = cases.case17

      const actual = testParser(input)

      const expected = 'OK: ast("(1 + 2) * 4^6 - {4+1}/5") ==> (((1 + 2) * (4 ^ 6)) - ((4 + 1) / 5))'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
});