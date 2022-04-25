'use strict'

const sample = {
    op: '+',
    type: 'expression',
    operands: [
        1,
        2,
    ]
}

// def(num execute1 := value)
const case1 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'execute1',
        10,
        'num', // no existe en asignaciones
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

// def(bool, id, (1 + 2))
const case4 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'executefail1',
        sample,
        'bool',
    ]
}

// num lol := x
const case5 = { op: ':=', type: 'instruction', operands: [ 'lol', 'xdebug', 'num' ] }

// num lol2 := 'lol'
const case6 = {
    op: ':=',
    type: 'instruction',
    operands: [
      'lol2',
      { op: 'quote', type: 'expression', operands: [ 'lol' ] },
      'num'
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