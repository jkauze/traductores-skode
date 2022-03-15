# Parser: Gramatica

> Manual of SKcode Grammar implementation

```js
<entrada>     -> <instrucción> | <expresión>
<instrucción> -> <definición> | <asignación>
<definición>  -> <tipo> <identificador> := <expresión> 
<asignación>  -> <identificador> := <expresión>
<tipo> -> Number | Boolean
<expresión>
    -> <expresión> + <expresión>
    -> <expresión> * <expresión>
    -> <número>
    ...
```

