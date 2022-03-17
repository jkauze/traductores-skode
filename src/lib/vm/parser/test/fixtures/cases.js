'use strict'

const removeUnnecesarySpaces = (input) => input.replace(/\s+/g,' ').trim()

const parseToArray = (input) => input.split(' ')

const setupCase = (input) => {
    const formatedArgs = removeUnnecesarySpaces(input)
    return parseToArray(formatedArgs)
  }
  
const case1 = setupCase('1 + 2')

const case2 = setupCase('x + 1')

module.exports = {
    case1,
    case2,
}
