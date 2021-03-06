'use strict'

// 1 + 2
const case1 = {
    op: '+',
    type: 'expression',
    operands: [
        1,
        2,
    ]
}

// (1 + (2 * (2 * (2 * 3))))
const case2 = {
    op: '+',
    type: 'expression',
    operands: [
        1,
        {
            op: '*',
            type: 'expression',
            operands: [
                2,
                {
                    op: '*',
                    type: 'expression',
                    operands: [
                        2,
                        {
                            op: '*',
                            type: 'expression',
                            operands: [
                                2,
                                3
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

// def(bool id := value)
const case3 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        'value',
        'bool', // no existe en asignaciones
    ]
}

// asg(id := value)
const case4 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        'value',
    ]
}

// asg(id, (1 + 2))
const case5 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        case1,
    ]
}

// def(bool, id, (1 + 2))
const case6 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        case1,
        'bool', // no existe en asignaciones
    ]
}

// ((y - z) + x)
const case7 = {
    op: '+',
    type: 'expression',
    operands: [{ op: '-', type: 'expression', operands: ['y', 'z'] }, 'x']
}

// ((x - y) + z)
const case8 = {
    op: '+',
    type: 'expression',
    operands: [{ op: '-', type: 'expression', operands: ['x', 'y'] }, 'z']
}

// (+y)
const case9 = {
    op: '+', type: 'expression', operands: ['y']
}

// ((+y) - x)
const case10 = {
    op: '-',
    type: 'expression',
    operands: [{ op: '+', type: 'expression', operands: ['y'] }, 'x']
}

// ((y+x)-z)
const case11 = {
    op: '-',
    type: 'expression',
    operands: [{ op: '+', type: 'expression', operands: ['y', 'x'] }, 'z']
}

// (y+(x-z))
const case12 = {
    op: '+',
    type: 'expression',
    operands: ['y', { op: '-', type: 'expression', operands: ['x', 'z'] }]
}

// asg(x, [1+1,2])
const case13 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'x',
        [{ op: '+', type: 'expression', operands: [1, 1] }, 2]
    ]
}

const case14 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'x',
        ['1', { op: '+', type: 'expression', operands: [2, 1] }],
        'bool'
    ]
}

const case15 = {
    op: ':=',
    type: 'instruction',
    operands: ['x', [1, 2, 3, 4], 'bool']
}

const case16 = [{
    op: '+', type: 'expression', operands: [1, 2]
}]

const case17 = [1]

const case18 = {
    op: '+',
    type: 'expression',
    operands: [
        { op: '+', type: 'expression', operands: [1] },
        { op: '-', type: 'expression', operands: [1] }
    ]
}

const case19 = []


// x := 3 = 3 && true
const case20 = {
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
                    operands: [{ op: '=', type: 'expression', operands: [3, 3] }, true]
                },
                { op: '!', type: 'expression', operands: [true] }
            ]
        },
        'bool'
    ]
}

// x < y + 3 = 35
const case21 = {
    op: '=',
    type: 'expression',
    operands: [
        {
            op: '<',
            type: 'expression',
            operands: ['x', { op: '+', type: 'expression', operands: ['y', 3] }]
        },
        35
    ]
}

// y / w
const case22 = {
    op: 'quote',
    type: 'expression',
    operands: [{ op: '/', type: 'expression', operands: ['y', 'w'] }]
}

// z = x + 'y / w'
const case23 = {
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
                    operands: [{ op: '/', type: 'expression', operands: ['y', 'w'] }]
                }
            ]
        }
    ]
}

// "y" + 1
const case24 = {
    op: '+',
    type: 'expression',
    operands: [{ op: 'quote', type: 'expression', operands: ['y'] }, 1]
}

// if(x,a[0],1)
const case25 = {
    op: 'if',
    type: 'expresion',
    operands: [ 'x', { op: 'index', type: 'expression', operands: [ 'a', 0 ] }, 1 ]
}

// reset()
const case26 = { op: 'reset', type: 'expression' }

// [1,2,3][1]
const case27 = { op: 'index', type: 'expression', operands: [ [ 1, 2, 3 ], 1 ] }

// [1,2,3][1] * x
const case28 = {
    op: '*',
    type: 'expression',
    operands: [
        { op: 'index', type: 'expression', operands: [ [ 1, 2, 3 ], 1 ] },
        'x'
    ]
}

// [1,2,3][1*2^6] * a[]
const case29 = {
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
        { op: 'index', type: 'expression', operands: [ 'a', 1 ] }
    ]
}

// ltype(2<=3 && false)
const case30 = {
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

// valor[i + 1] := true;
const case31 = {
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

// num k := 'floor(100 * uniform())'
const case32 = {
    op: ':=',
    type: 'instruction',
    operands: [
      'k',
      {
        op: 'quote',
        type: 'expression',
        operands: [
          {
            op: 'floor',
            type: 'expression',
            operands: [
              {
                op: '*',
                type: 'expression',
                operands: [ 100, { op: 'uniform', type: 'expression' } ]
              }
            ]
          }
        ]
      },
      'num'
    ]
  } 

// -( 1+2 )
const case33 = {
    op: '-',
    type: 'expression',
    operands: [ { op: '+', type: 'expression', operands: [ 1, 2 ] } ]
  }

// true && false
const case34 = { op: '&&', type: 'expression', operands: [ true, false ] }

// -pi() + pi()
const case35 = {
    op: '+',
    type: 'expression',
    operands: [
      {
        op: '-',
        type: 'expression',
        operands: [ { op: 'pi', type: 'expression' } ]
      },
      { op: 'pi', type: 'expression' }
    ]
  }

module.exports = {
    case1,
    case2,
    case3,
    case4,
    case5,
    case6,
    case7,
    case8,
    case9,
    case10,
    case11,
    case12,
    case13,
    case14,
    case15,
    case16,
    case17,
    case18,
    case19,
    case20,
    case21,
    case22,
    case23,
    case24,
    case25,
    case26,
    case27,
    case28,
    case29,
    case30,
    case31,
    case32,
    case33,
    case34,
    case35
}