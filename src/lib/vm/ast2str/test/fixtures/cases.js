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

module.exports = {
    case1,
    case2,
    case3,
    case4,
    case5,
    case6
}