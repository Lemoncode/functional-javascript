## Trabajando con los side effects

Esta función contiene side effects, podemos enmascararla dentro de ortra función para que se mantenga pura:

```javascript
// getFromStorage :: String -> (_ -> String)
const getFromStorage = key => () => localStorage[key];
```

Con esta tosca envoltura siempre obtendremos la misma salida, una función que cuando sea llamada , devolvera un item del `local storage`.

Expuesta de este modo, no nos es demasiado efectiva, si tuvieramos un manera de poderla manipular a través de un contenedor... Hola _IO_.

```js
class IO {
    static of(x) {
        return new IO(() => x)
    }

    constructor(fn) {
        this.$value = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.$value));
    }

    inspect() {
        return `IO(${this.$value})`;
    }
}
```

_IO_ difiere de los functors anteriores en que `$value` es siempre una función. _IO_ retarda la acción impura capturandola en la envoltura de una función. Podemos pensar en _IO_ como el contenedor del valor devuelto de la acción envuelta y no el envoltorio en si mismo. Esto es evidente aquí:

```js
static of(x) {
    return new IO(() => x)
}
```

Ya que lo necesitamos para evitar la evaluación de la función.

Veamos algunos ejemplos jugando con el DOM.

> NOTA:  Para poder hacer estos ejemplos hay que adecuar playground

* utils.js: contiene los operadores que nos van a hacer falta
* io.js: contiene la clase IO
* maybe.js: contiene la clase Maybe
* index.hmtl: contiene un html para poder seleccionar el ejemplo que queramos ejecutar
* package.json: editar este fichero para arrancar parcel cargando index.html
* main.js: el código par poder ejecutar un código u otro.

Editar _main.js_ para tener los ejemplos vacíos

```js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('example-1').addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

    document.getElementById('example-2').addEventListener('click', (evt) => {
        evt.stopPropagation();
    });
});

```

### Example 1

> NOTA: Editar el fichero playground/exmaples/example_1.js

```js
import { IO } from '../io';
import { prop, split, head } from '../utils';

export function example1() {
    // ioWindow :: IO Window
    const ioWindow = new IO(() => window);

    const t = ioWindow.map(win => win.innerWidth);

    console.log(t.eval());

    const s = ioWindow
        .map(prop('location'))
        .map(prop('href'))
        .map(split('/'));

    console.log(s.eval());

    const $ = (selector) => new IO(() => document.querySelectorAll(selector));

    const u = $('#myDiv').map(head).map(div => div.innerHTML);

    console.log(u.eval());
}
```

Update _main.js_

```diff
+import { example1 } from './examples/example_1';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('example-1').addEventListener('click', (evt) => {
        evt.stopPropagation();
+       example1();
    });

    document.getElementById('example-2').addEventListener('click', (evt) => {
        evt.stopPropagation();
    });
});

```

_ioWindow_ es un contenedor _IO_, mientras que _$_ es una función que devuelve un _IO_ después de su invoccación. Cuando realizamos un _map_ sobre un _IO_, lo que estamos haciendo es añadir esa función al final de la composición, el cual se convierte en el nuevo valor y así sucesivamente. Las funciones que vamos pasando no se ejecutan. simplemente se quedan alamacenadas, el resultado es un patrón cola de comandos.

Hemos hecho una cola de funciones impuras, en algún punto deberemos apretar el gatillo y obtener un resultado, en el siguiente ejemplo vamos a hacer esto.

### Example 2

```js
import { IO } from '../io';
import { Maybe } from '../maybe';
import { compose, map, split, eq, find, last } from '../utils';

export function example2() {
    // url :: IO String
    const url = new IO(() => 'https://localhost:3000/?searchTerm=wafflehouse&content=red');

    // toPairs :: String -> [String]
    const toPairs = compose(map(split('=')), split('&'));

    // params :: String -> [[String]]
    const params = compose(toPairs, last, split('?'));

    // findParam :: String -> IO Maybe [String]
    const findParam = key => map(
        compose(
            Maybe.of, 
            find(compose(eq(key), head)), 
            params
        ), 
        url
    );

    console.log(findParam('searchTerm').$value());
}
```

Update _main.js_

```diff
import { example1 } from './examples/example_1';
+import { example2 } from './examples/example_2';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('example-1').addEventListener('click', (evt) => {
        evt.stopPropagation();
        example1();
    });

    document.getElementById('example-2').addEventListener('click', (evt) => {
        evt.stopPropagation();
+       example2();
    });
});

```

Nuestro código mantiene sus manos limpias al envolver _url_ en un _IO_ y pasando el contenedor. Notar además que hemos apilado nuestros contenedore, no pasa nad a por tener _IO(Maybe[x])_, en realidad aquí tenemos una profundidad de 3, ya que _Array_ es mapeable.

Por último _$value_ en _IO_ no es realmente su valor, es la función que debemos ejecutar para obtener nuestr side effect, es más a decuado si hacemos una pequeña refactorización en este clase:

```js
class IO {
  constructor(io) {
    this.unsafePerformIO = io;
  }

  map(fn) {
    return new IO(compose(fn, this.unsafePerformIO));
  }
}
```

Ahora la llamada a nuestro código se convierte en `findParam('searchTerm').unsafePerformIO()` la cual habla mucho mejor de nuestras intenciones.