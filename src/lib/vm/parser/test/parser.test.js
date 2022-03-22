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
        op: '+',
        type: 'expression',
        operands: [
          1,
          {
            op: '-',
            type: 'expression',
            operands: [
              2,
              {
                op: '*',
                type: 'expression',
                operands: [
                  3,
                  {
                    op: '/',
                    type: 'expression',
                    operands: [
                      4,
                      { op: '^', type: 'expression', operands: [ 5, 6 ] }
                    ]
                  }
                ]
              }
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
    it("Case 18: ''", () => {
      const input = cases.case18

      const actual = parser(input)

      const expected = ''
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 19: '1'", () => {
      const input = cases.case19

      const actual = parser(input)

      const expected = '1'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 20: 'SKode'", () => {
      const input = cases.case20

      const actual = parser(input)

      const expected = 'SKode'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 21: '1+2'", () => {
      const input = cases.case21

      const actual = parser(input)

      const expected = '1+2'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 22: '2' + '1'", () => {
      const input = cases.case22

      const actual = parser(input)

      const expected = { op: '+', type: 'expression', operands: [ '2', '1' ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 23: '{2+1}' = '(1+2)'", () => {
      const input = cases.case23
      
      const actual = parser(input)
      
      const expected = { op: '=', type: 'expression', operands: [ '{2+1}', '(1+2)' ] }
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
    it("Case 24: '()'", () => {
      const input = cases.case24

      const actual = parser(input)

      const expected = '()'
      assert.deepEqual(actual, expected, 'should generate the ast');
    });
});