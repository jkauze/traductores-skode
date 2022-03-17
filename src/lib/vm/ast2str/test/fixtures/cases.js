'use strict'

// 1 + 2
const case1 = {
    op: '+',
    type: 'expression',
    operands: [
        '1',
        '2',
    ]
}

// (1 + (2 * (2 * (2 * 3))))
const case2 = {
    op: '+',
    type: 'expression',
    operands: [
        '1',
        {
            op: '*',
            type: 'expression',
            operands: [
                '2',
                {
                    op: '*',
                    type: 'expression',
                    operands: [
                        '2',
                        {
                            op: '*',
                            type: 'expression',
                            operands: [
                                '2',
                                '3'
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

// def(Boolean id := value)
const case3 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        'value',
        'Boolean', // no existe en asignaciones
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

// def(Boolean, id, (1 + 2))
const case6 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        case1,
        'Boolean', // no existe en asignaciones
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
        [{ op: '+', type: 'expression', operands: ['1', '1'] }, '2']
    ]
}

const case14 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'x',
        ['1', { op: '+', type: 'expression', operands: ['2', '1'] }],
        'Boolean'
    ]
}

const case15 = {
    op: ':=',
    type: 'instruction',
    operands: ['x', ['1', '2', '3', '4'], 'Boolean']
}

const case16 = [{
    op: '+', type: 'expression', operands: ['1', '2']
}]

const case17 = ['1']

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
    case17
}