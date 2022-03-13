'use strict'

const { case1, case2, case3, case4, case5, case6 } = require('./cases')

const isExpressionType = ({ type }) => type === 'expression'

const isObject = operand => typeof operand === 'object'

const hasChild = operands => operands.some(isObject)

const formatExpressionString = (leftOperand, op, rightOperand) => (
    `(${leftOperand} ${op} ${rightOperand})`
)

const isDefinition = typeOperand => !!typeOperand

const getAssignmentString = (leftOperand, middleOperand) => (
    `asg(${leftOperand}, ${middleOperand})`
)

const getDefinitionString = (rightOperand, leftOperand, middleOperand) => (
    `def(${rightOperand}, ${leftOperand}, ${middleOperand})`
)

const formatInstructionString = (id, expression, type) => isDefinition(type)
    ? getDefinitionString(type, id, expression)
    : getAssignmentString(id, expression)


const ast2strExpression = ast => {
    const { op, operands } = ast
    const [leftOperand, rightOperand] = operands
    let newRightOperand = rightOperand

    if (hasChild(operands)) newRightOperand = ast2strExpression(rightOperand)

    return formatExpressionString(leftOperand, op, newRightOperand)
}

const ast2strInstruction = ast => {
    const { operands } = ast
    const [id, expression, type] = operands
    let newExpression = expression

    if (hasChild(operands)) newExpression = ast2strExpression(expression)

    return formatInstructionString(id, newExpression, type)
}

const main = ast => isExpressionType(ast) ? ast2strExpression(ast) : ast2strInstruction(ast)


// console.log(main(case1))
// console.log(main(case2))
// console.log(main(case3))
// console.log(main(case4))
// console.log(main(case5))
console.log(main(case6))
