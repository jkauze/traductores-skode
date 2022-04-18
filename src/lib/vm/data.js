'use strict'

const data = { 
    xdebug: { rvalue: 6, cvalue: 6, type: 'Num', tick: 0 },
    ydebug: {
        rvalue: 7,
        cvalue: {
          op: '+',
          type: 'expression',
          operands: [ { op: 'quote', type: 'expression', operands: [ 'xdebug' ] }, 1 ]
        },
        type: 'Num',
        tick: 0
      },
      zdebug: {
        rvalue: 18,
        cvalue: {
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
        type: 'Num',
        tick: 0
      }
 }

module.exports = data

