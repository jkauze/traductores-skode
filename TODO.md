# TODO

- Crear todas las funciones de la vm para el evalExpression
- Process: es una funcion que recibe toda la mierda del repl que no sea un comando magico
    - process debe validar si lo que va a procesar es un "acotacion", si es "acotacion" no lo manda al parser y simplemente lo printea
    - Si no es "acotacion" entonces lo manda al parser, obtiene el ast (o sino explota) y valida:
        - si es una action = execute y este llama a evalExpression (hace validaciones y asigna en memoria)
        - si es una expression = llama a evalExpression (hace validaciones y retorna el valor)

# TODO
    - Definir el ast de las funciones y dar el mock de sample para el ast2str
    - Montar todas la gramaticas de las funciones
    - adaptar ast2str para soportar las funciones nuevas
    - Quitar los strings del parser/grammar
    - arreglar el parser para aceptar definiciones con Boolean
    - Limpiar el lexer con todo lo que no va

### CASO QUE SI NO HACEMOS NO ME SENTIRE MAL
    - [1,2,3][0] = 11 / a[0] / [1+2, 2*3, a+2+b][0] / a+[1,2][0]
    {
        op: 'arrayIndex',
        type: 'expression',
        operands: [expression<ID/ARRAY>,expression<INDEX>]
    }

    - a = [1,2,3]; a[0] = 9

