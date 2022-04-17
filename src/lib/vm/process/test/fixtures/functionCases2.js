'use strict'

const removeUnnecesarySpaces = (input) => input.replace(/\s+/g, ' ').trim()

const parseToArray = (input) => input.split(' ')

const setupCase = (input) => {
    const formatedArgs = removeUnnecesarySpaces(input)
    return parseToArray(formatedArgs)
}

const case1 = setupCase('ln(10+1*2)')

const case2 = setupCase('ln(uniform())')

const case3 = setupCase('exp(10^2)')

const case4 = setupCase('exp(floor(1.1))')

const case5 = setupCase('sin(floor(1.2 * 1))')

const case6 = setupCase('cos(floor(1.2 * 1))')

const case7 = setupCase('type([1,2,3][0])')

const case8 = setupCase('type([1,2,3][2-1])')

const case9 = setupCase('ltype(xdebug)')

const case10 = setupCase('sum([1+10, 2*2])')

const case11 = setupCase('sum([1+10, true && true])')

const case12 = setupCase('length([1,2,xdebug, 1/1])')

const case13 = setupCase('avg([2+2, 2*2, 8/2])')

const case14 = setupCase('pi()')

const case15 = setupCase('pi([1,2])')

const case16 = setupCase('now()')

const case17 = setupCase('now(1,2)')

const case18 = setupCase("num functionDebug := 'floor(sum([50,50]) * uniform())';")

const case19 = setupCase("floor(uniform() * uniform())")

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
    case19
}
