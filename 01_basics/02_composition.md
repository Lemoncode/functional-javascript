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

### Pointfree

Significa usar funciones que no 'nombren' sus operadores (el data con que se alimentan). Para poder desarrollar este estilo de programacion:

* Las funciones deben ser ciudadanas de primer orden.
* Currying 
* Composition

```js
// no point free because we mention the data
const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');

// pointfree
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

// Example implementation
const replace = curry((what, replaceWith, data) => data.replace(what, replaceWith));
const toLowerCase = (x) => x.toLowerCase(); 

const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
console.log(snakeCase('Hola Pepino'));
```

Lo que estamos haciendo es mediante invocación parcial, es asegurar que nuestras funciones sean invocadas sólo con un argumento de entrada. El _curry_ nos permite preparar cada función, para tomar sólo un argumento de entrada y pasarlo a la sifuiente función.

## Ejercicio 1. Jugando con Point Free. 

Dada una variable que almacene un nombre con apellidos, devuelva las iniciales en mayúscula y separadas por un punto:

```js
const name = 'jaime salas zanzada';
initials(name); // J. S. Z.
```

### Solución

```js
const { map, compose, head, toUpperCase, split, intercalate } = require('../utils/operators');

// ## Ejercicio 1. Jugando con Point Free. 
const name = 'jaime salas zancada'

const splitted = split(' ');
console.log(splitted(name)); // ['jaime', 'salas', 'zancada'];

const wordInitial = compose(toUpperCase, head);
console.log(wordInitial('jaime')); // [J]
```

Ahora nuestro problema es como podemos hacer para que una función que opera sólo sobre un string de argumento de entrada, lo haga sobre una colección en su lugar

```diff
const { map, compose, head, toUpperCase, split, intercalate } = require('../utils/operators');

// ## Ejercicio 1. Jugando con Point Free. 
const name = 'jaime salas zancada'

const splitted = split(' ');
console.log(splitted(name));

const wordInitial = compose(toUpperCase, head);
console.log(wordInitial('jaime'));

+const initials = compose(map(compose(toUpperCase, head)), split(' '));
+console.log(initials(name));
```

Ya solo queda invocar una función, que tome una colección de strings y las unifiqueen una sólo string, separada por un punto.

```diff
const { map, compose, head, toUpperCase, split, intercalate } = require('../utils/operators');

// ## Ejercicio 1. Jugando con Point Free. 
const name = 'jaime salas zancada'

-const splitted = split(' ');
-console.log(splitted(name));

-const wordInitial = compose(toUpperCase, head);
-console.log(wordInitial('jaime'));

-const initials = compose(map(compose(toUpperCase, head)), split(' '));
+const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));
console.log(initials(name));
```

### A tener en cuenta sobre Pointfree

Nos ayuda a quitar nombres inecesarion y mantener nuestro código conciso y genérico. Nos obliga tener funciones más pequeñas que componen funciones más complejas. Se puede convertir en un arma de doble filo, ya que podemos llegar a ofuscar nuestro código. Está bien que no todo el código sea `pointfree`.

## Debugging

Un error comun es componer algo que no espere los argumentos deseados, debido a que no hemos aplicacalo los argumentos parcialmente de forma adecuada

```javascript
const append = curry((what, s) => `${s}${what}`);
const angry = compose(append('!'), toUpperCase);

const latin = compose(map, angry, reverse); // We're feeding angry with an array
latin(['frog', 'eyes']); // Throws exception  

const latin = compose(map(angry), reverse);
latin(['frog', 'eyes']); // ['EYES!', 'FROG!']
```

Para ahorrarnos penas con la composición podemos recorrir a la siguiente función:

```js
const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});
```

```js
//NOTE: const t = replace(/\s{2,}/ig, ' ')('The      world  is  a vampire');
/* returns  'The world is a vampire'*/ 
const intercalate = curry((what, xs) => xs.join(what));

const dasherize = compose(
  intercalate('-'),
  toLowerCase,
  split(' '),
  replace(/\s{2,}/ig, ' '),
);

dasherize('The world     is a     vampire'); // exports.toLowerCase = x => x.toLowerCase();
```

After trace

```js
const dasherize = compose(
    intercalate('-'),
    toLowerCase,
    trace('after split'), 
    split(' '),
    replace(/\s{2,}/ig, ' '),
);

dasherize('The    world is a    vampire'); // after split [ 'The', 'world', 'is', 'a', 'vampire' ]
```

Podemos comprobar que el problema es cómo estammos alimentando `toLowerCase`, esto lo podemos fácilmente solucionar

```js
const dasherize = compose(
    intercalate('-'),
    map(toLowerCase),
    trace('after split'),
    split(' '),
    replace(/\s{2,}/ig, ' '),
);

dasherize('The    world is a    vampire'); // 'the-world-is-a-vampire'
```

## Ejercicios

En cada uno de los siguientes ejercicios, consideraremos los objectos Book de la siguiente forma:

```js
{
    title: 'El Señor de las Moscas',
    sold_units: 100000,
    price: 12.00,
    in_stock: true,
}
```

1. Usar `compose()` para reescribir la siguiente función

```js
// isLastInStock :: [Book] -> Boolean
isLastInStock = (books) => {
    const lastBook = last(books);
    return prop('in_stock', lastBook);
}
```

2. Considerando la siguiente función:

```js
const avarage = xs => reduce(add, 0, xs) / xs.length;
```

Usar la función `avarage` para refactorizar `avarageSoldUnits` como composición:

```js
// avarageSoldUnits :: [Book] -> Int
const avarageSoldUnits = (books) => {
  const soldUnits = map(c => c.sold_units, books);
  return average(soldUnits);
};
```

3. Refactor `bestPrice` usando `compose()` y otras funciones en estilo `pointfree`.

```js
// bestSold :: [Book] -> String
const bestPrice = (books) => {
    const sorted = sortBy(book => book.price, books);
    const cheap = last(sorted);
    return concat(cheap.title, ' is the more cheap');
};
```
