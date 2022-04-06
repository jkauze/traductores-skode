'use strict'

const data = { 
    x: { value: 6, type: 'Num' },
    y: {
        value: {
          op: '+',
          type: 'expression',
          operands: [ { op: 'quote', type: 'expression', operands: [ 'x' ] }, 1 ]
        },
        type: 'Num'
      }
 }

module.exports = data

