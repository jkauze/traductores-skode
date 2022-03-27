const ast = {
    op: '||',
    type: 'expression',
    operands: [{ op: '+', type: 'expression', operands: [1, 1] }, 5]
}

const ast2 = {
    op: '+',
    type: 'expression',
    operands: [ { op: '-', type: 'expression', operands: [ 1 ] }, 2 ]
  }

const getStringExpression = (tmpLvalue, op, tmpRvalue) => `${tmpLvalue} ${op} ${tmpRvalue}`

const getStringExpressionUnary = (value, op) => `${op} ${value}`

const isBinary = (tmpLvalue, tmpRvalue) => !!tmpLvalue && !!tmpRvalue

const evalExpression = ast => {
    if (typeof ast !== 'object') return ast
    const { op, operands } = ast
    const [lvalue, rvalue] = operands
    let tmpLvalue = lvalue 
    let tmpRvalue = rvalue
    /**
     * validaciones:
     * no se pueden sumar cosas con Boolean
     * no se puede dividir entre 0
     * no se puede operar arreglos
     * no se pueden operar variables no definidas
     * definir cuales operadores binarios/unarios son para los Boolean
     */
    if (typeof tmpLvalue === 'object') tmpLvalue = evalExpression(tmpLvalue)
    if (typeof tmpRvalue === 'object') tmpRvalue = evalExpression(tmpRvalue)

    const strinExpression = isBinary(tmpLvalue, tmpRvalue) ? getStringExpression(tmpLvalue, op, tmpRvalue) : getStringExpressionUnary(tmpLvalue, op) 
    return eval(strinExpression)
}


// console.log(evalExpression(ast2))

module.exports = evalExpression