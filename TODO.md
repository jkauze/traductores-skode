# TODO ETAPA 3
    - [x] falta adaptar las funciones para que se permitan entre quotes, ejemplo 'uniform()' -  gramatica
    - [] Ajustar funcion length, sum y avg en evaluate para solo aceptar arreglos - gramatica
    - [x] Funciones, pueden tener funciones adentro - gramatica, ejemplo: floor(uniform()) da error en la gramatica
    - [x] Agregar caso -> num lol := x
    - [x] Agregar caso -> num lol := 'x' y luego cambiar el valor de x
    - [x] Verificar recursion en EvaluateExpression
    - [x] arreglar el bug que hacer que no se pueda evaluar expresiones con funciones
    - [x] Arreglar manejo de errores para cuando el grammar da un "null" en found

# TODO ETAPA 4
    - boceto del ast de las funciones:
        - [x] in
        - [x] exp
        - [x] sin
        - [x] cos
        - [x] formula
        - [x] tick
        - [x] array
    - hacer la gramatica de las funciones anteriores
        - [x] in
        - [x] exp
        - [x] sin
        - [x] cos
        - [x] formula
        - [x] tick
        - [x] array
    - hacer las funciones en el process.
        - [x] in
        - [x] exp
        - [x] sin
        - [x] cos
        - [x] formula
        - [] tick
        - [] array
    - buscar como manejar lo del histogram
    - agregar una nueva propiedad a las variables quoted ( en la memoria ) para poder utilizar tick, 
    aqui vamos a guardar el ast original (sin ningun valor evaluado)


dudas por revisar en la gramatica
- pi(1) la gramatica lo retorna como error, deberia dar error? o ignorar los parametros -- (R) Ya no da error, solo retona los parametros y proccess lo maneja
- lo mismo de arriba pero a las otras funciones, a mi parecer deberia poder recibir cualquier n cantidad de parametros, pero solo se toman los que se necesiten -- (R) Ya no da error, solo retona los parametros y proccess lo maneja


## Boceto

ln --> { op: "ln", type: expression, operands: [x] }
exp --> { op: "exp", type: expression, operands: [x] }
sin --> { op: "sin", type: expression, operands: [x] }
cos --> { op: "cos", type: expression, operands: [x] }
formula --> { op: "formula", type: expression, operands: [x] }
tick --> { op: "tick", type: expression }
array --> { op: "array", type: expression, operands: [x,y] }