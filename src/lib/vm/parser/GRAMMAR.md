# Parser: Grammar

> Manual of SKcode Grammar implementation

This parser function invoke `lexer` to get tokens from the input, to create the AST with the `parser grammar`

## Stókhos Grammar:
```js
<entrada>       -> <instrucción> | <expresión>
<instrucción>   -> <definición> | <asignación>
<definición>    -> <tipo> <identificador> := <expresión> 
<asignación>    -> <identificador> := <expresión>
<tipo>          -> Número | Booleano | Error
<identificador> -> Secuencia de caracteres


<expresión>
    -> <expresión> + <expresión>
    -> <expresión> - <expresión>
    -> <expresión> * <expresión>
    -> <expresión> / <expresión>
    -> <expresión> % <expresión>
    -> <expresión> ^ <expresión>
    -> <número>
    ...
```