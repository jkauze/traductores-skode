'use strict'

const removeUnnecesarySpaces = (input) => input.replace(/\s+/g,' ').trim()

const parseToArray = (input) => input.split(' ')

const setupCase = (input) => {
    const formatedArgs = removeUnnecesarySpaces(input)
    return parseToArray(formatedArgs)
  }
  
const case1 = setupCase('1')

const case2 = setupCase('x')

const case3 = setupCase('!1')

const case4 = setupCase('!x')

const case5 = setupCase('+1 + -1')

const case6 = setupCase('!x && -y')

const case7 = setupCase('(1+2)')

const case8 = setupCase('[1+2]')

const case9 = setupCase('[]')

const case10 = setupCase('[,]')

const case11 = setupCase('[1,2,3]')

const case12 = setupCase('[!x,2+2]')

const case13 = setupCase('[num] x := []')

const case14 = setupCase('num x := 20+3')

const case15 = setupCase('x := 20 + 2')

const case16 = setupCase('1+2-3*4/5^6')

const case17 = setupCase('(1 + 2) * 4^6 - {4+1}/5')

const case18 = setupCase('bool x := 3 = 3 && true || !true')

const case19 = setupCase('x < y + 3 = 35')

const case20 = setupCase("'y / w'")

const case21 = setupCase("z = x + 'y / w'")

const case22 = setupCase('if(x,a[0],1)')

const case23 = setupCase('reset()')

const case24 = setupCase('[1,2,3][1]')

const case25 = setupCase('[1,2,3][1] * x')

const case26 = setupCase('[1,2,3][1*2^6] * a[]')

const case27 = setupCase('ltype(2<=3 && false)')

const case28 = setupCase('valor[i + 1] := true;')

const case29 = setupCase('func(1,2,3)')

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
  case29
}
