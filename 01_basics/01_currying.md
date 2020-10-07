## Currying

El concepto es simple: Puedes llamar a una función con menos argumentos que los esperados. Devuelves una función que toma los argumentos que queden por pasar.

```js
const add = x => y => x + y; // [1]
const increment = add(1);
const addTwo = add(2);

increment(3); // 4
addTwo(2); // 4
```

1. Tenemos una función que devuelve otra función, al llamar a la función devuelta _recuerda_ el primer argumento dado, gracias a la magia del _clousure_. 

### Custom Curry

Lo que queremos es ser caapaces de poder hacer curry sobre las funciones, sin tener que preocuparnos por el número de argumentos que necesiten nuestras funciones recibir. Para tal fn podemos utilizar una función como la que sigue:

```js
function curry(fn) {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    };
}
```

> arity es el número de argumentos total que toma una función hasta su invocación. Por ejemplo _add_ tendrá un arity de 2.

```js
const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
```

> El patrón que sigue es que el último argumento es el _data_ que estamos operando.

#### Ejemplos

Dadas las funciones anteriores podemos escribir:

```js
match(/j/g, 'hola jamon'); // ['j']
const hasLetterJ = match(/j/g); // x => x.match(/j/g);
hasLetterJ('hola jamon'); // ['j']

filter(hasLetterJ, ['me gusta el jamon', 'prefiero un limon']); // [''me gusta el jamon']
const removeNoJs = filter(hasLetterJ); // xs => xs.filter(x => x.match(/j/g);)
removeNoJs(['me gusta el jamon', 'prefiero un limon', 'judías con tomate']); // 'me gusta el jamon', 'judías con tomate'

const noVowels = replace(/[aeiou]/ig);
const censored = noVowels('*');
censored('el gato hace miau'); // *l g*t* h*c* m***
```

Pre cargamos una función con varios argumentos de entrada devolviendo una función que recuerda esos argumentos de entrada. 

El _currying_ es fantástico a la hora de generar nuevas funciones simplemente con el paso parcial de arumentos. Además nos proporciona un mecanismo para poder aplicar funciones que sólo operan en un elemento en una colección de elementos.

```js
const toUpperCase = (s) => s.toUpperCase();
const allWordsToUpper = map(toUpperCase);
```

Dar a una función menos argumentos de los que espera, es lo que típicamente se llama **aplicación parcial**. La aplicaión parcial nos puede ayudar a eliminar boiler plate en nustro código.

```js
const toUpperCase = (s) => s.toUpperCase();
const allWordsToUpper = words => map(words, toUpperCase);
```

Podemos ver que generar funciones que operen directamente sobre los arrays (las podríamos hacer) empieza a tener menos sentido, ya que _map_ nos proporciona la herramienta para invocar _inline_. Una función que devuelve otra función es lo que se conoce como una __HOF__ (High Order Function).

Cuando hemos hablado de funciones puras, hemos dicho que toman un argumento de entrada y devuelven un argumneto de salida. El _currying_ hace exactamente esto por cada argumento de entrada devuelve una función esperndo el resto de argumentos.
