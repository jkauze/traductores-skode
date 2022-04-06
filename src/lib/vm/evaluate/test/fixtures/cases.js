'use strict'

// 1 + 2 = 3
const case1 = {
    op: '+',
    type: 'expression',
    operands: [
        1,
        2,
    ]
}

// (1 + (2 * (2 * (2 * 3)))) = 
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



// ((yy - zz) + xx)
const case3 = {
    op: '+',
    type: 'expression',
    operands: [{ op: '-', type: 'expression', operands: ['yy', 'zz'] }, 'xx']
}

// ((xx - yy) + zz)
const case4 = {
    op: '+',
    type: 'expression',
    operands: [{ op: '-', type: 'expression', operands: ['xx', 'yy'] }, 'zz']
}

// (+yy)
const case5 = {
    op: '+', type: 'expression', operands: ['yy']
}

// ((+yy) - xx)
const case6 = {
    op: '-',
    type: 'expression',
    operands: [{ op: '+', type: 'expression', operands: ['yy'] }, 'xx']
}

// ((yy+xx) - zz)
const case7 = {
    op: '-',
    type: 'expression',
    operands: [{ op: '+', type: 'expression', operands: ['yy', 'xx'] }, 'zz']
}

// (yy+(xx-zz))
const case8 = {
    op: '+',
    type: 'expression',
    operands: ['yy', { op: '-', type: 'expression', operands: ['xx', 'zz'] }]
}

//  [1+2] = [3]
const case9 = [{
    op: '+', type: 'expression', operands: [1, 2]
}]

// [1] = [1]
const case10 = [1]

const case11 = []

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
    case11
}