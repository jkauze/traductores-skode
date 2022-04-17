'use strict'

const removeUnnecesarySpaces = (input) => input.replace(/\s+/g, ' ').trim()

const parseToArray = (input) => input.split(' ')

const setupCase = (input) => {
    const formatedArgs = removeUnnecesarySpaces(input)
    return parseToArray(formatedArgs)
}

const case1 = setupCase('1')

const case2 = setupCase('xdebug')

const case3 = setupCase('!1')

const case4 = setupCase('!xdebug')

const case5 = setupCase('+1 + -1')

const case6 = setupCase('!xdebug && -ydebug')

const case7 = setupCase('(1+2)')

const case8 = setupCase('[1+2]')

const case9 = setupCase('[]')

const case10 = setupCase('[,]')

const case11 = setupCase('[1,2,3]')

const case12 = setupCase('[!xdebug,2+2]')

const case13 = setupCase('[num] xdebug := []')

const case14 = setupCase('num xdebug := 20+3')

const case15 = setupCase('xdebug := 20 + 2')

const case16 = setupCase('1+2-3*4/5^6')

const case17 = setupCase('(1 + 2) * 4^6 - {4+1}/5')


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
