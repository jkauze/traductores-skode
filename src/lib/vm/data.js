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
      },
      zdebug: {
        value: {
          op: 'quote',
          type: 'expression',
          operands: [
            {
              op: '+',
              type: 'expression',
              operands: [
                {
                  op: '+',
                  type: 'expression',
                  operands: [
                    {
                      op: '+',
                      type: 'expression',
                      operands: [ 'xdebug', 'ydebug' ]
                    },
                    1
                  ]
                },
                2
              ]
            }
          ]
        },
        type: 'Num'
      }
 }

module.exports = data

