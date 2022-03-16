# Parser: Gramatica

> Manual of SKcode Grammar implementation

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