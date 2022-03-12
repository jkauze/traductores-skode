'use strict'

/* const test = {
    predicate: ':=',
    type: 'num',
    identifier: 'variable',
    expresion: {
        predicate: '+',
        operands: [
        '1',
        {
            predicate: '+',
            operands: [ { predicate: '*', operands: [ '2', '3' ] }, '4' ]
        }
        ]
    }
} */

/* 
{
    type: 'BinaryExpression',
    operator: ':=',
    left: { type: 'Literal', value: 40 },
    right: { type: 'Literal', value: 2 }
}
*/

// def(num, x, ( 6 * 7 ) )
// def( num, variable, ( 1 + ( ( 2 * 3 ) + 4 ) ) )
// num variable := 1 + ( 2 * 3 + 4 )
const ast2str = ast => {

}

module.exports = {
    ast2str
}