# traductores-lab
Proyecto de traductores e interpretadores


# Recomendaciones

- Usar [nvm](https://github.com/nvm-sh/nvm) con node 14.15.0 y npm 8.5.0 (usar el comando `nvm use` dentro del proyecto para agarrar esta configuracion default con el **.nvmrc**)
# Como usar (prototipo)

```sh

# instalar dependencias:
npm install

# para ejecutar el repl:
npm start

# para salir del repl CRTL+C o escribir el comando "."
<Stókhos> .
```



# Stókhos powered by SKode

Repositorio del proyecto del laboratorio de traductores e interpretadores para el trimestre ene-mar 2022.

Equipo: _SKode_

# Recomendaciones

- Usar [nvm](https://github.com/nvm-sh/nvm) con node 14.15.0 y npm 8.5.0 (usar el comando `nvm use` dentro del proyecto para agarrar esta configuracion default con el **.nvmrc**)

Es recomendado utilizar `nvm` para que los entornos de prueba coincidan con los de desarrollo del proyecto.

# Instrucciones etapa 1: Analisis lexicografico y REPL

- Instalar dependencias
```sh
# en la carpeta raiz del proyecto 
npm install
```
- Ejecutar el REPL
```sh
# en la carpeta raiz del proyecto 
npm start
```

Se le mostrara el prompt del repl con el cual podra interactuar y ejecutar los distintos comandos del mismo
```sh
Welcome to stokhos 1.0.0
<Stókhos>
```

# Documentacion

 - [`Comandos del REPL`](src/lib/repl/README.md)
