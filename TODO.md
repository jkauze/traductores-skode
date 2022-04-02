# TODO
    - [] Crear funcion if y crear caso en process
    - [] Crear funcion type y crear caso en process
    - [] Crear funcion itype y crear caso en process
    - [] Crear funcion reset y crear caso en process
    - [] Crear funcion uniform y crear caso en process
    - [] Crear funcion floor y crear caso en process
    - [] Crear funcion length y crear caso en process
    - [] Crear funcion sum y crear caso en process
    - [] Crear funcion avg y crear caso en process
    - [] Crear funcion pi y crear caso en process
    - [] Crear funcion now y crear caso en process
    - [] Ajustar ast2str para mostrar arreglos dentro de una funcion
    - [] Agregar en gramatica el siguiente caso a[0]
    - [] Agregar cados de pruebas para funciones en ast2str y parser

### CASO QUE SI NO HACEMOS NO ME SENTIRE MAL
    - [1,2,3][0] = 11 / a[0] / [1+2, 2*3, a+2+b][0] / a+[1,2][0]
    {
        op: 'arrayIndex',
        type: 'expression',
        operands: [expression<ID/ARRAY>,expression<INDEX>]
    }

    - a = [1,2,3]; a[0] = 9

### Casos de prueba por hacer
    - num lol := x
    - num lol := 'x' y luego cambiar el valor de x
    