## Asynchronous Tasks

> NOTA: Para usar Task de una manera más robusta, utilizar: https://github.com/folktale/data.task

Lo que queremos es un contenedor como _IO_, que nos permita hacer lo mismo que con los `side effects` pero desde un punto de vista del código asíncrono, para tal fin vamos a utilizar _Task_

```js
class Task {
    constructor(fork) {
        this.fork = fork;
    }

    static rejected(x) {
        return new Task((reject, _) => reject(x));
    }

    static of(x) {
        return new Task((_, resolve) => resolve(x));
    }

    map(fn) {
        return new Task((reject, resolve) => this.fork(reject, compose(resolve, fn)));
    }
}
```

## Ejercicio

Antes de continuar con nuestras explicaciones vamos a crear un servicio en _node_ capaz de realizar peticiones https (sólo el verbo GET), y que devuelva JSON. La función debera envuelta en la función `curry` para poder utilizar `aplicación parcial`. Expresado Hindler-Milner tendría la siguiente firma:

```js
// getJSON :: Url -> Params -> (a -> b) -> (c -> d) -> void 
```

Probar su funcionamiento usando la url: `https://jsonplaceholder.typicode.com/posts?userId=1`. Donde se alimnetaria la función de la siguiente manera:

* Url: https://jsonplaceholder.typicode.com/posts
* Params: { userId: 1 }

> Pista: Crear una función que reciba una url base y los query params, y devuelva una url completamente formada

La solución en `utils/http.service.js`

## Ejemplos de uso

Leer un fichero es un proceso asíncrono

```js
const fs = require('fs');
const { split, head, compose, trace } = require('../../../utils/operators');
const Task = require('./task');

const readFile = filename => new Task((reject, result) => {
    fs.readFile(filename, (err, data) => (err ? reject(err) : result(data.toString())));
});

readFile('metamorphosis')
    .map(compose(split('\n'), trace('feed')))
    .map(head)
```

Si ejecutamos el código, parece que no está ocurriendo nada, para que _Task_ se evalue, es obligatorio invocar a _fork_

```diff
readFile('metamorphosis')
    .map(compose(split('\n'), trace('feed')))
    .map(head)
+   .fork((err) => console.log(err), (data) => console.log(data));
```

Recuperar los posts de un usuario por su id

```js
// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/posts?userId=1
// $getJSON :: String -> {} -> Task
const $getJSON = curry((url, params) => new Task((reject, result) => {
    getJSON(url, params, result, reject);
}));

const taskTitle = $getJSON('https://jsonplaceholder.typicode.com/posts', { userId: 1 })
    .map(head)
    .map(prop('title'));
    
taskTitle.fork((err) => console.log(err), (data) => console.log(data));
```

Utilizar incluso con resultados que no sean a futuro

```js
Task.of(3).map(three => three + 1);
// Task(4)
```

Las funciones que estamos llamando _reject_ y _result_, son las funciones de `callback` para `error` y `success`. 

Como con _IO_, _Task_ esperará pacientemente hasta que invoquemos a _fork_ para ser evaluada. Funciona de una manera similar a `unsafePerformIO`, pero como su propio nombre indica, sin bloquear el proceso principal.

```js
const $getJSON = curry((url, params) => new Task((reject, result) => {
    getJSON(url, params, result, reject);
}));

const taskTitle = $getJSON('https://jsonplaceholder.typicode.com/posts', { userId: 1 })
    .map(head)
    .map(prop('title'));
    
taskTitle.fork((err) => console.log(err), (data) => console.log(data));

console.log('Hola desde por aquí');

// Hola desde por aquí
// sunt aut facere repellat provident occaecati excepturi optio reprehenderit
```

## Ejercicio

> NOTA: En el *db_access/utils/index.js* encontraremos todas las estructuras algebraicas necesarias.

Un gran poder conlleva una gran repsonsabilidad, ha llegado el momento de usar nuestros conocimientos para conectarnos a una base de datos `postgresql` y realizar un petición simple, para ello deberemos seguir un serie de pasos


### 1. Leer los parámetros de configuración del siguiente fichero

```json
{
    "uname": "postgres",
    "pass": "postgres",
    "host": "localhost",
    "db": "test"
}
```

Para ello crear una función que lea el fichero, devolviendo una _Task_

### 2. Connectar a la base de datos usando Postgres.connect

Podemos usar `Postgres.connect` realizando en el fichero que lo vayamos a consumir

```js
const Postgres = require('./postgres-client');
```

`Postgres.connect` esperando una `url`, como por ejemplo `db:pg://postgres:postgres@localhost5432/test`, deberemos crear una función que sea capaz de consumir los datos de ese fichero y generar una url como la anterior

```js
// dbUrl :: Config -> Either Error Url
```

### 3. Ejecutar una query contra la base de datos

`Postgres.connect` nos devuelve un cliente, podemos ejecutar una query de la siguiente manera

```js
const client = Postgres.connect(url);
client.query('SELECT * FROM users;', (err, res) => console.log(err, res));
```

Solución en el directorio `db_access`
