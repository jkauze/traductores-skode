# Stókhos powered by SKode

Repositorio del proyecto del laboratorio de traductores e interpretadores para el trimestre ene-mar 2022.


# Requisitos

> Es recomendado utilizar `nvm` para que los entornos de prueba coincidan con los de desarrollo del proyecto.

- Usar [nvm](https://github.com/nvm-sh/nvm) con node 14.15.0 y npm 8.5.0 
```sh
# en la carpeta raiz del proyecto 
nvm use 
```
- Instalar dependencias:
```sh
# en la carpeta raiz del proyecto 
npm install
```

# Instrucciones etapa 1: Analisis lexicografico y REPL

- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```

- Se le mostrara el prompt del repl con el cual podra interactuar y ejecutar los distintos comandos del mismo
```sh
Welcome to stokhos 1.0.0
<Stókhos>
```

# Instrucciones etapa 2: Parser && AST

- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```

- Una vez iniciado el parser podra ejecutar el nuevo comando `.ast <valid input>`
```sh
Welcome to stokhos 3.0.0
<Stókhos> .ast num x := a
OK:ast("num x := a") ==> def(Num, x, a)
```

# Instrucciones etapa 3: Validaciones estaticas && Ambiente de ejecucion

- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```

- Una vez iniciado el REPL podra ejecutar expresiones/instrucciones al repl para procesarlas
```sh
Welcome to stokhos 3.0.0
<Stókhos> num prueba := 12 + 13
ACK: Num prueba := 25
<Stókhos> prueba
OK: prueba ==> 25
<Stókhos> prueba + 10
OK: 35
<Stókhos> xxxxx + 2
ERROR: "xxxxx + 2" ==> Uncaught ReferenceError: "xxxxx" is not defined
```

# Instrucciones etapa 4: Manejo de memoria && nuevas funciones

- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```
- Una vez iniciado el REPL consulte todas las funciones disponible y sintaxis implementadas
```sh
<Stókhos> .help
.reset                        Clear error logs
.failed                       Show error logs
.help                         Print this help message
.load <file>                  Load a <file> and execute each line
.lex <input>                  Invoke lexer to analyze lexicographically the <input>
.ast <input>                  Invoke parser to create ast of the <input> and print in a string
.env                          Print all defined variables in mem
sum([<exp>])                  Sum all <exp> array items. Return a number
avg([<exp>])                  Return average of all <exp> array items. Return a number
length([<exp>])               Return the length of the array. Return a number
type(<exp>)                   Return the type (number or boolean) of the <exp>, also works with arrays. Return a string
ltype(<exp>)                  Return the type (number or boolean) of the <exp> if the exp is assignable. Return a string
pi()                          Return a pi aproximated. Return a number
now()                         Return a date in ms from statict checkpoint. Return a number
uniform()                     Return a random number between 0 and 1. Return a number
floor(<exp>)                  Return int rounded of <exp>. Return a number
sin(<exp>)                    Return sin of <exp>. Return a number
cos(<exp>)                    Return cos of <exp>. Return a number
formula(<id>)                 Return the cvalue of the <id>
array(<size>, <exp>)          Return an array with <size> length and <exp> items.
if(<exp>, <expT>, <expF>)     Return a <expT> if <exp> is true, else return <expF>
.                             Exit the REPL
```

- Empiece a usar STOKHOS!  \o/ :) ;) <3
```sh
Welcome to stokhos 4.0.0
Type ".help" for more information
<Stókhos> [num] x := array(3, 'uniform()')
ACK: [Num] x := [0.14094696300881182,0.2027306015287298,0.9622381784248013]
<Stókhos> x[1]
OK:x[1] ==> 0.2027306015287298
<Stókhos> num koz := 'uniform()'
ACK: Num koz := 0.3935482015587848
<Stókhos> koz
OK:koz ==> 0.3935482015587848
<Stókhos> sin(koz)
OK:sin(koz) ==> 0.383467778771942
```

#  Ejecutar el suite de tests

Para Ejecutar las tests se brindan los siguientes comandos de `NPM`:
```sh
## en la carpeta raiz del proyecto 

# Ejecutar todos los tests del proyecto:
npm run test

# Ejecutar los test del parser:
npm run test:parser

# Ejecutar los test del lexer:
npm run test:lexer

# Ejecutar los test del ast2str:
npm run test:ast2str

# Ejecutar los test del tesParser:
npm run test:tesParser

# Ejecutar los test del execute:
npm run test:execute

# Ejecutar los test del evaluate:
npm run test:evaluate

# Ejecutar los test del process:
npm run test:process
```

# Documentacion

 - [`Comandos del REPL`](src/lib/repl/README.md)
 - [`Gramatica del parser (grammar.md)`](src/lib/vm/parser/GRAMMAR.md)


> Equipo: _SKode:_ Carlos Sivira & Jesus Kauze
