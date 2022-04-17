'use strict'

const data = { 
    xdebug: { value: 6, type: 'Num' },
    ydebug: {
        value: {
          op: '+',
          type: 'expression',
          operands: [ { op: 'quote', type: 'expression', operands: [ 'xdebug' ] }, 1 ]
        },
        type: 'Num'
      }
 }

module.exports = data

