# TODO ETAPA 4
    - [] Revisar casos 1 = 2 y 1 <> 2 en process. Error
    - [] Hacer las funciones en el process.
        - [] tick
        - [] array
    - [] Buscar como manejar lo del histogram
    - [] Agregar una nueva propiedad a las variables quoted
    - [] Agregar caso de ast2str -(1+2) Error


# Planteamientos

## Buscar como manejar lo del histogram

## Agregar una nueva propiedad a las variables quoted

En la memoria se va a agregar una propiedad para poder utilizar tick, la idea es 
guardar el ast original sin ningun valor evaluado.

## Boceto de funciones

ln --> { op: "ln", type: expression, operands: [x] }
exp --> { op: "exp", type: expression, operands: [x] }
sin --> { op: "sin", type: expression, operands: [x] }
cos --> { op: "cos", type: expression, operands: [x] }
formula --> { op: "formula", type: expression, operands: [x] }
tick --> { op: "tick", type: expression }
array --> { op: "array", type: expression, operands: [x,y] }