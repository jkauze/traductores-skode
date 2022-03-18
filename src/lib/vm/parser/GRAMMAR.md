# Parser: Grammar

> Manual of SKcode Grammar implementation

This parser function invoke `lexer` to get tokens from the input, to create the AST with the `parser grammar`

## Stókhos Grammar:
```js

<entrada>
    -> <instrucción> | <expresión base>
<instrucción>
    -> <definición> | <asignación>
<definición>
    -> <tipo> <identificador> := <expresión base> ;
<asignación>
    -> <identificador> := <expresión base> ;
<tipo>
    -> Número | Booleano | Error

<expresión base>
    -> <expresión arreglo> | <expresión simple>

<expresión arreglo>
    -> [] | [<expresión simple>] | [<cuerpo arreglo>]
<cuerpo arreglo>
    -> <expresión simple>, | <expresión simple>

<expresión simple>
    -> <expresion aditiva> | <expresión primaria>
<expresion aditiva> 
    -> <expresión multiplicativa> <operador aditivo> <expresión aditiva>
<expresion multiplicativa> 
    -> <expresión relacional> <operador multiplicativo> <expresión multiplicativa>
<expresion relacional> 
    -> <expresión boolana> <operador relacional> <expresión relacional>
<expresion boolana> 
    -> <expresión unaria> <operador boolano> <expresión boolana>
<expresion unaria> 
    -> <operador unario> <expresión primaria>

<expresión primaria> 
    -> ( <expresión simple> )
    | { <expresión simple> }
    | [ <expresión simple> ]
    | <caracater>
    | <cadena>

<caracater>
    -> <caracter numerico> | <identificador>
<cadena>
    -> '' | "" | '<secuencia caracateres>' | "<secuencia caracateres>"

<caracter numerico> -> Valores numericos punto flotante
<secuencia caracateres> -> Secuencia de caracteres para tipo cadena
<identificador> -> Secuencia de caracteres
<operador aditivo> -> + | -
<operador multiplicativo> -> * | / | % | ^
<operador relacional> -> = | <> | < | <= | > | >=
<operador boolano> -> && | ||
<operador unario> -> + | - | !

```