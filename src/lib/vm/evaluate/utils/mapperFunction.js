'use strict'

const functionsType = {
    reset: 'reset',
    pi: 'pi',
    now: 'now',
    uniform: 'uniform',
    sum: 'sum',
    type: 'type',
    ltype: 'ltype',
    avg: 'avg',
    length: 'length',
    floor: 'floor',
    in: 'in',
    sin: 'sin',
    cos: 'cos',
    exp: 'exp',
    formula: 'formula',
    if: 'if',
    index: 'index',
    function: 'function'
}

const mapperFunction = op => functionsType[op]