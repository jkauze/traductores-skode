# REPL Commands

- `.lex <chars>` - Invoke lexer 

```sh
<Stókhos> .lex hola 2 + 2
OK:lex("hola 2 + 2") ==> [TkId("hola"),TkNum(2),TkPlus,TkNum(2)]
```
---
- `.load <filepath>` - Load file and execute non-empty lines

```sh
### sample.txt ####
# 1 + 2
# .lex @
# .comandoInvalido
# .lex 2 + +
###################

<Stókhos> .load sample.txt
ERROR: "1 + 2" ==> interpretación no implementada
ERROR: caracter inválido ("@") en la entrada
ERROR: ".comandoInvalido" ==> interpretación no implementada
OK:lex("2 + +") ==> [TkNum(2),TkPlus,TkPlus]
```
---
- `.failed` - Show error logs

```sh
<Stókhos> .failed
  (sample.txt, 0, ERROR: "1 + 2" ==> interpretación no implementada),
  (sample.txt, 1, ERROR: caracter inválido ("@") en la entrada),
  (sample.txt, 2, ERROR: ".comandoInvalido" ==> interpretación no implementada),
```
---
- `.reset` - Clean error logs

```sh
<Stókhos> .reset
```

---
- `.ast` - invoke parser (first invoke lexer, after this, create the AST with the parser, and convert AST to String with ast2str function)

```sh
<Stókhos> .ast 1 + 2 + 3
OK:ast("1 + 2 + 3") ==> (1 + (2 + 3))

<Stókhos> .ast num x := a
OK:ast("num x := a") ==> def(Num, x, a)
```

---
- `.` - Exit the REPL

```sh
<Stókhos> .
```