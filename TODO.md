# TODO

- Crear todas las funciones de la vm para el evalExpression
- Process: es una funcion que recibe toda la mierda del repl que no sea un comando magico
    - process debe validar si lo que va a procesar es un "acotacion", si es "acotacion" no lo manda al parser y simplemente lo printea
    - Si no es "acotacion" entonces lo manda al parser, obtiene el ast (o sino explota) y valida:
        - si es una action = execute y este llama a evalExpression (hace validaciones y asigna en memoria)
        - si es una expression = llama a evalExpression (hace validaciones y retorna el valor)

# TODO
    - [x] Definir el ast de las funciones y dar el mock de sample para el ast2str
    - [] Montar todas la gramaticas de las funciones
    - [x] adaptar ast2str para soportar las funciones nuevas
    - [x] Quitar los strings del parser/grammar
    - [x] arreglar el parser para aceptar definiciones con Boolean
    - [x] Arregar precedencias en el parser
    - [x] Agregar gramatica para acotaciones con formato de ast
    - [x] Limpiar el lexer con todo lo que no va
    - [x] Actualizar test de ast2str cos casos 18 a 21 de parser
    - [XXX] Agregar caso recursivo en ast2str para acotaciones,incluye formateo de texto (que significa formateo de texto?)
    - [x] Agregar caso recursivo en evalExpression para acotaciones
    - [] Agregar caso de gurdado en memoria en execute para acotaciones
    - [] Actualizar grammar.md con acotaciones, funciones, palabras reservadas y precedencias ajustadas. Recordar eliminar strings.

## Bosquejo de ASTs para funciones

    - if: { op:'if', type: 'expression', operands: [<expression>, <expression>, <expression>] }
    - type: { op:'type', type: 'expression', operands: [<expression>] }
    - itype: { op:'itype', type: 'expression', operands: [<expression>] }
    - reset: { op:'reset', type: 'expression' }
    - uniform: { op:'uniform', type: 'expression' }
    - floor: { op:'floor', type: 'expression', operands: [<expressionNumber>] }
    - length: { op:'length', type: 'expression', operands: [<expressionArray>] }
    - sum: { op:'sum', type: 'expression', operands: [<expressionNumber>] }
    - avg: { op:'avg', type: 'expression', operands: [<expressionNumber>] }
    - pi: { op:'pi', type: 'expression' }
    - now: { op:'length', type: 'expression' }


### CASO QUE SI NO HACEMOS NO ME SENTIRE MAL
    - [1,2,3][0] = 11 / a[0] / [1+2, 2*3, a+2+b][0] / a+[1,2][0]
    {
        op: 'arrayIndex',
        type: 'expression',
        operands: [expression<ID/ARRAY>,expression<INDEX>]
    }

    - a = [1,2,3]; a[0] = 9

