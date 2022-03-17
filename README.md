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
Welcome to stokhos 2.0.0
<Stókhos> .ast num x := a
OK:ast("num x := a") ==> def(Num, x, a)
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
```

# Documentacion

 - [`Comandos del REPL`](src/lib/repl/README.md)
 - [`Gramatica del parser (grammar.md)`](src/lib/vm/parser/GRAMMAR.md)


> Equipo: _SKode:_ Carlos Sivira & Jesus Kauze
