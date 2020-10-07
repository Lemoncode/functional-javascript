## Composition

### Introducción

La composición más simple que podemos tener sería la siguiente:

```js
const compose2 = (f, g) => x => f(g(x));
```

Donde _f_ y _g_ son funciones, y _x_ es el valor que es pasado a través de ellas.

Utilizando la función anterior podemos generar el siguiente ejemplo:

```js
const toUpperCase = x => x.toUpperCase();
const compose2 = (f, g) => x => (f(g(x)));
const exclaim = x => `${x}!`;
const shout = compose2(exclaim, toUpperCase);
console.log(shout('go functional'));
```

La composición de dos funciones devuelve una nueva función.

En nuestar definición de _compose_, la función _g_ se ejecutará antes que _f_, generando un flujo de derecha a izquierda de los datos. Una vez que nos acostumbremos a `compose`, se hace más legible que el anidamiento de funciones.

```js
const shout = x => exclaim(toUpperCase(x));
```

Antes de seguir avanzando, evidentemente no queremos componer siempre sólo dos funciones, queremos componer _n_ funciones. Una posible implementacion de esto sería:

```js
const compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
```

En el ejemplo anterior el orden de aplicaión de las funciones no importa. Veamos un ejemplo en el que si que importa:

```js
const head = x => x[0];
const reverse = (xs) => xs.reduce((acc, x) => [x].concat(acc), []);
const last = compose(head, reverse);
console.log(last(['melon', 'banana', 'manzana']));
```

La composición cumple la asociativa

```js
// associativity
compose(f, compose(g, h)) === compose(compose(f, g), h);
```

Lo que viene a significar que no importa como asociemos estas funciones. Notar que en la formulación anterior, no alteramos el orden de aplicación de las funciones. Por ejemplo:

```js
compose(toUpperCase, compose(head, reverse));
compose(compose(toUpperCase, head), reverse);
```

Podemos demostrar esto con un ejercicio sencillo:

```js
const { compose, head, reverse } = require('./utils');

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;

const arg = ['jumpkick', 'roundhouse', 'uppercut'];

// Associative
// f * (g * h) = (f * g) * h 
x = compose(toUpperCase, compose(head, reverse));
y = compose(compose(toUpperCase, head), reverse);

if (x(arg) === y(arg)) {
    console.log('Associative test');
}
```

Como no importa el orden de como agrupemos las llamadas a _compose_, el resultado va a ser siempre el mismo. Eso nos lleva a poder usar _compose_ de una forma variada:

```js
// previously we'd have to write two composes, but since it's associative, 
// we can give compose as many fn's as we like and let it decide how to group them.
const arg = ['jumpkick', 'roundhouse', 'uppercut'];
const lastUpper = compose(toUpperCase, head, reverse);
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

lastUpper(arg); // 'UPPERCUT'
loudLastUpper(arg); // 'UPPERCUT!'
```

Un beneficio de la _propiedad asociativa_ es que cualquier grupo de funciones puede ser extarido y `empaquetado` en su propia composición:

```js
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

// -- or ---------------------------------------------------------------

const last = compose(head, reverse);
const loudLastUpper = compose(exclaim, toUpperCase, last);

// -- or ---------------------------------------------------------------

const last = compose(head, reverse);
const angry = compose(exclaim, toUpperCase);
const loudLastUpper = compose(angry, last);

// more variations...
```

Aquí no hay respuestas erroneas o correctas, lo que si es que debemos buscar composiciones que enfaticen la reusabilidad. 