'use strict'

const sample = {
    op: '+',
    type: 'expression',
    operands: [
        1,
        2,
    ]
}

// def(Num execute1 := value)
const case1 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'execute1',
        10,
        'Num', // no existe en asignaciones
    ]
}

// asg(id := value)
const case2 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'execute1',
        20,
    ]
}

// asg(id, (1 + 2))
const case3 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'execute1',
        sample,
    ]
}

// def(Boolean, id, (1 + 2))
const case4 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'id',
        sample,
        'Boolean',
    ]
}

module.exports = {
    case1,
    case2,
    case3,
    case4
}