'use strict'

const { parser } = require('../index')
const cases = require('./fixtures/cases')

const assert = require('assert');

describe('#parser', () => {
    it("Case 1: 1", () => {
        const input = cases.case1

        const actual = parser(input)

        const expected = 1
        assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 2: x", () => {
      const input = cases.case2

      const actual = parser(input)

      const expected = 'x'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 3: !1", () => {
      const input = cases.case3

      const actual = parser(input)

      const expected = { op: '!', type: 'expression', operands: [ 1 ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 4: !x", () => {
      const input = cases.case4

      const actual = parser(input)

      const expected = { op: '!', type: 'expression', operands: [ 'x' ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 5: +1 + -1", () => {
      const input = cases.case5

      const actual = parser(input)

      const expected = {
        op: '+',
        type: 'expression',
        operands: [
          { op: '+', type: 'expression', operands: [ 1 ] },
          { op: '-', type: 'expression', operands: [ 1 ] }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 6: !x && -y", () => {
      const input = cases.case6

      const actual = parser(input)

      const expected = {
        op: '&&',
        type: 'expression',
        operands: [
          { op: '!', type: 'expression', operands: [ 'x' ] },
          { op: '-', type: 'expression', operands: [ 'y' ] }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 7: (1+2)", () => {
      const input = cases.case7

      const actual = parser(input)

      const expected = { op: '+', type: 'expression', operands: [ 1, 2 ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 8: [1+2]", () => {
      const input = cases.case8

      const actual = parser(input)

      const expected = [ { op: '+', type: 'expression', operands: [ 1, 2 ] } ]
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 9: []", () => {
      const input = cases.case9

      const actual = parser(input)

      const expected = []
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 10: [,]", () => {
      const input = cases.case10

      const actual = parser(input)

      const expected = []
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 11: [1,2,3]", () => {
      const input = cases.case11

      const actual = parser(input)

      const expected = [ 1, 2, 3 ]
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 12: [!x,2+2]", () => {
      const input = cases.case12

      const actual = parser(input)

      const expected = [
        { op: '!', type: 'expression', operands: [ 'x' ] },
        { op: '+', type: 'expression', operands: [ 2, 2 ] }
      ]
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 13: [num] x := []", () => {
      const input = cases.case13

      const actual = parser(input)

      const expected = { op: ':=', type: 'instruction', operands: [ 'x', [], [ 'Num' ] ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 14: num x := 20+3", () => {
      const input = cases.case14

      const actual = parser(input)

      const expected = {
        op: ':=',
        type: 'instruction',
        operands: [
          'x',
          { op: '+', type: 'expression', operands: [ 20, 3 ] },
          'Num'
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 15: x := 20 + 2", () => {
      const input = cases.case15

      const actual = parser(input)

      const expected = {
        op: ':=',
        type: 'instruction',
        operands: [ 'x', { op: '+', type: 'expression', operands: [ 20, 2 ] } ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 16: 1+2-3*4/5^6", () => {
      const input = cases.case16

      const actual = parser(input)

      const expected = {
        op: '-',
        type: 'expression',
        operands: [
          { op: '+', type: 'expression', operands: [ 1, 2 ] },
          {
            op: '/',
            type: 'expression',
            operands: [
              { op: '*', type: 'expression', operands: [ 3, 4 ] },
              { op: '^', type: 'expression', operands: [ 5, 6 ] }
            ]
          }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 17: (1 + 2) * 4^6 - {4+1}/5", () => {
      const input = cases.case17

      const actual = parser(input)

      const expected = {
        op: '-',
        type: 'expression',
        operands: [
          {
            op: '*',
            type: 'expression',
            operands: [
              { op: '+', type: 'expression', operands: [ 1, 2 ] },
              { op: '^', type: 'expression', operands: [ 4, 6 ] }
            ]
          },
          {
            op: '/',
            type: 'expression',
            operands: [ { op: '+', type: 'expression', operands: [ 4, 1 ] }, 5 ]
          }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 18: bool x := 3 = 3 && true || !true", () => {
      const input = cases.case18

      const actual = parser(input)

      const expected = {
        op: ':=',
        type: 'instruction',
        operands: [
          'x',
          {
            op: '||',
            type: 'expression',
            operands: [
              {
                op: '&&',
                type: 'expression',
                operands: [ { op: '=', type: 'expression', operands: [ 3, 3 ] }, true ]
              },
              { op: '!', type: 'expression', operands: [ true ] }
            ]
          },
          'Boolean'
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 19: x < y + 3 = 35", () => {
      const input = cases.case19

      const actual = parser(input)

      const expected = {
        op: '=',
        type: 'expression',
        operands: [
          {
            op: '<',
            type: 'expression',
            operands: [ 'x', { op: '+', type: 'expression', operands: [ 'y', 3 ] } ]
          },
          35
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 20: 'y / w'", () => {
      const input = cases.case20

      const actual = parser(input)

      const expected = {
        op: 'quote',
        type: 'expression',
        operands: [ { op: '/', type: 'expression', operands: [ 'y', 'w' ] } ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 21: 'z = x + 'y / w'", () => {
      const input = cases.case21

      const actual = parser(input)

      const expected = {
        op: '=',
        type: 'expression',
        operands: [
          'z',
          {
            op: '+',
            type: 'expression',
            operands: [
              'x',
              {
                op: 'quote',
                type: 'expression',
                operands: [ { op: '/', type: 'expression', operands: [ 'y', 'w' ] } ]
              }
            ]
          }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 22: if(x,a[0],1)", () => {
      const input = cases.case22

      const actual = parser(input)

      const expected = {
        op: 'if',
        type: 'expression',
        operands: [ 'x', { op: 'index', type: 'expression', operands: [ 'a', 0 ] }, 1 ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 23: reset()", () => {
      const input = cases.case23

      const actual = parser(input)

      const expected = { op: 'reset', type: 'expression' }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 24: [1,2,3][1]", () => {
      const input = cases.case24

      const actual = parser(input)

      const expected = { op: 'index', type: 'expression', operands: [ [ 1, 2, 3 ], 1 ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 25: [1,2,3][1] * x", () => {
      const input = cases.case25

      const actual = parser(input)

      const expected = {
        op: '*',
        type: 'expression',
        operands: [
          { op: 'index', type: 'expression', operands: [ [ 1, 2, 3 ], 1 ] },
          'x'
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 26: [1,2,3][1*2^6] * a[]", () => {
      const input = cases.case26

      const actual = parser(input)

      const expected = {
        op: '*',
        type: 'expression',
        operands: [
          {
            op: 'index',
            type: 'expression',
            operands: [
              [ 1, 2, 3 ],
              {
                op: '*',
                type: 'expression',
                operands: [ 1, { op: '^', type: 'expression', operands: [ 2, 6 ] } ]
              }
            ]
          },
          { op: 'index', type: 'expression', operands: [ 'a', [] ] }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 27: ltype(2<=3 && false)", () => {
      const input = cases.case27

      const actual = parser(input)

      const expected = {
        op: 'ltype',
        type: 'expression',
        operands: [
          {
            op: '&&',
            type: 'expression',
            operands: [ { op: '<=', type: 'expression', operands: [ 2, 3 ] }, false ]
          }
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 28: valor[i + 1] := true;", () => {
      const input = cases.case28

      const actual = parser(input)

      const expected = {
        op: ':=',
        type: 'instruction',
        operands: [
          {
            op: 'index',
            type: 'expression',
            operands: [
              'valor',
              { op: '+', type: 'expression', operands: [ 'i', 1 ] }
            ]
          },
          true
        ]
      }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 29: func(1,2,3)", () => {
      const input = cases.case29

      const actual = parser(input)

      const expected = { op: 'function', type: 'error', operands: [ 'func', [ 1, 2, 3 ] ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
});