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

# Instrucciones etapa 3: Validaciones estatics && Ambiente de ejecucion

- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```

- Una vez iniciado el parser podra ejecutar expresiones/instrucciones al repl para procesarlas
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
```

# Documentacion

 - [`Comandos del REPL`](src/lib/repl/README.md)
 - [`Gramatica del parser (grammar.md)`](src/lib/vm/parser/GRAMMAR.md)


> Equipo: _SKode:_ Carlos Sivira & Jesus Kauze
