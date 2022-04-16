# TODO ETAPA 3
    - [] falta adaptar las funciones para que se permitan entre quotes, ejemplo 'uniform()' -  gramatica
    - [] Ajustar funcion length, sum y avg en evaluate para solo aceptar arreglos - gramatica
    - [] Funciones, pueden tener funciones adentro - gramatica, ejemplo: floor(uniform()) da error en la gramatica
    - [x] Agregar caso -> num lol := x
    - [x] Agregar caso -> num lol := 'x' y luego cambiar el valor de x
    - [x] Verificar recursion en EvaluateExpression
    - [x] arreglar el bug que hacer que no se pueda evaluar expresiones con funciones
    - [x] Arreglar manejo de errores para cuando el grammar da un "null" en found

# TODO ETAPA 4
    - boceto del ast de las funciones:
        - in
        - exp
        - sin
        - cos
        - formula
        - tick
        - array
    - hacer la gramatica de las funciones anteriores
    - 

dudas por revisar en la gramatica
- pi(1) la gramatica lo retorna como error, deberia dar error? o ignorar los parametros
- lo mismo de arriba pero a las otras funciones, a mi parecer deberia poder recibir cualquier n cantidad de parametros, pero solo se toman los que se necesiten
