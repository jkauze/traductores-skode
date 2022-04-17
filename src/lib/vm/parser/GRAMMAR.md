# Parser: Grammar

> Manual of SKcode Grammar implementation

This parser function invoke `lexer` to get tokens from the input, to create the AST with the `parser grammar`

## Stókhos Grammar:
```js

<entrada> -> <instrucción> | <expresión generica>

<instrucción> -> <definición> | <asignación>

<definición> -> <tipo> <identificador generico> := <expresión generica> ;

<asignación> -> <identificador generico> := <expresión generica> ;

<tipo> -> [ <tipos reservados> ] | <tipos reservados>

<tipos reservados> -> Número | Booleano

<expresión generica> -> <expresión función> | <expresión binaria>

<expresión función> -> <identificador> ( <expresion lista> )

<expresión primaria> -> <identificador generico> | <palabra reservada> | 
                        <número> | <expresión arreglo> | <expresión bloque>

<identificador generico> -> <identificador> [ <expresión generica> ] | 
                            <identificador>

<identificador> -> Cadena de caracteres

<palabra reservada> -> true | false

<número> -> Dígitos numéricos con o sin decimales

<expresión arreglo> -> [ ] | [ <expresion lista> ] [ <expresión generica> ] | 
                        [ <expresion lista> ]

<expresion lista> -> <expresión generica> <elemento lista>

<elemento lista> -> , <expresion lista>

<expresión binaria> -> <expresión or lógico>

<expresión or lógico> -> <expresión and lógico> || <expresión and lógico>

<expresión and lógico> -> <expresión comparación> && <expresión comparación>

<expresión comparación> -> <expresión relacional> <operador comparación> <expresión comparación> |
                            <expresión relacional>
<operador comparación> -> = | <>

<expresión relacional> -> <expresión aditiva> <operador relacional> <expresión relacional> |
                            <expresión aditiva>
<operador relacional> -> < | <= | > | >=

<expresión aditiva> -> <expresión multiplicativa> <operador aditivo> <expresión multiplicativa>
<operador aditivo> -> + | -

<expresión multiplicativa> -> <expresión potencia> <operador multiplicativo> <expresión potencia>
<operador multiplicativo> -> * | / | %

<expresión potencia> -> <expresión unaria> ^ <expresión potencia> | <expresión unaria>

<expresión unaria> -> <operador unario> <expresión primaria> | <expresión primaria>
<operador unario> -> + | - | !

<expresión bloque> -> ' <expresión generica> ' | ( <expresión generica> ) | 
                        { <expresión generica> }

```