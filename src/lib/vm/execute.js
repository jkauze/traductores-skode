'use strict'

const data = require('./data')
const evalExpression = require('./evalExpression')

const ast = { op: ':=', type: 'instruction', operands: ['x', 2, 'Num'] }
const ast3 = { op: ':=', type: 'instruction', operands: ['x', true] }
const ast2 = {
    op: ':=',
    type: 'instruction',
    operands: [
        'x',
        {
            op: '*',
            type: 'expression',
            operands: [{ op: '+', type: 'expression', operands: [1, 2] }, 2]
        },
        'Num'
    ]
}

const mapType = {
    number: 'Num',
    boolean: 'Boolean'
}

const getType = (rvalueType) => mapType[typeof rvalueType]

const isValidType = (resultRvalue, type) => getType(resultRvalue) === type

const formatResponse = (string, status = 'OK') => ({ status, string })

const isAssignation = type => !type

const isDefined = lvalue => !!data[lvalue]

const execute = ast => {
    const { operands, op } = ast
    const [lvalue, rvalue, type] = operands
    const resultRvalue = evalExpression(rvalue)

    if (isAssignation(type)) {
        if (!isDefined(lvalue)) return formatResponse(`Uncaught ReferenceError: ${lvalue} is not defined`, 'ERROR')
        if (!isValidType(resultRvalue, data[lvalue]['type'])) return formatResponse(`TypeError: "${resultRvalue}" is not "${data[lvalue]['type']}" type`, 'ERROR')
        Object.assign(data, {
            [lvalue]: {
                ...data[lvalue],
                value: resultRvalue
            }
        })
        return formatResponse(`${lvalue} ${op} ${resultRvalue}`);
    } else {
        if (!isValidType(resultRvalue, type)) return formatResponse(`TypeError: "${resultRvalue}" is not "${type}" type`, 'ERROR')
        Object.assign(data, {
            [lvalue]: {
                value: resultRvalue,
                type
            }
        })
        return formatResponse(`${type} ${lvalue} ${op} ${resultRvalue}`);
    }

}

console.log(execute(ast3))
console.log(data)