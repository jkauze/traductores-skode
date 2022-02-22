'use strict'

const test = require('mocha')
const { parser } = require('../index')

test('case 1:  caso cuando se le pasa valor invaldo', (t) => {
    // preparacion
    const input = '1 + 2'

    // ejecucion
    const actual = parser(input)

    // evaluacion
    const expected = '[TkNumber(1), TkPlus, TkNumber(2)]'
    t.equal(actual, expected, 'should be tokenize correctly')
})

test('case 3:  caso cuando se le pasa valor invaldo', (t) => {
    // preparacion
    const input = '1 + 2'

    // ejecucion
    const actual = parser(input)

    // evaluacion
    const expected = '[TkNumber(1), TkPlus, TkNumber(2)]'
    t.equal(actual, expected, 'should be tokenize correctly')
})