## Functor Factory

En las distintas implementaciones de functors que hemos visto hasta ahora, hemos visto el método estático _of_, el objetivo de este método es 'guardar' valores en los ditsintos tipos, y se le conoce como _contexto mínimmo_. No substituye al constructor si no que es parte de una interfaz que recibe el nombre de _Pointed_

> Un pointed functor es un functor con el método `of`

Lo importante aquí es poder guardar cualquier valor y comenzar a usar _map_

```js
IO.of('tetris').map(concat(' master'));
// IO { unsafePerformIO: [Function] }

Maybe.of(1236).map(add(1));
// Maybe { '$value': 1237 }

Task.of([{ id: 2 }, { id: 3 }]).map(map(prop('id'))).fork(console.log, console.log);
// Task([ 2, 3 ])

Either.of('The past, present and future walk into a bar...').map(concat('it was tense.'));
//  Right {
//   '$value': 'it was tense.The past, present and future walk into a bar...'
// }
```

Si recordamos `IO` y `Task` esperan una función en su constructor, pero `Maybe` y `Either` no. El término 'mínimo contexto por defecto' lo que nos dice es que queremos hacer _lift_ sobre cualquier valor en nuestros tipos y hacer `map` con el comportamineto seleccionado del functor.

## Mixing Metaphors

Los _monads_ son como cebollas:

```js
const fs = require('fs');

// readFile :: String -> IO String
const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'));

// print :: String -> IO String
const print = x => new IO(() => {
    console.log(x);
    return x;
});

// cat :: String -> IO (IO String)
const cat = compose(map(print), readFile);
// IO(IO(file content))
cat('some_text').unsafePerformIO().unsafePerformIO();

```

Lo que tenemos aquí es un `IO` atrapada dentro de otro `IO` porque _print_ introduce un segundo `IO` durante la operación de `map`. Para poder trabajar sobre la _String_, debemos aplicar `map(map(f))` y para recuperar el valor `unsafePerformIO().unsafePerformIO()`

Hagamos una pequeña modificación para quedarnos con el primer carácter

```js
// cat :: String -> IO (IO String)
const cat = compose(map(print), readFile);
// cat('metamorphosis').unsafePerformIO().unsafePerformIO();

// catFirstChar :: String -> IO (IO String)
const catFirstChar = compose(map(map(head)), cat)

const t  = catFirstChar('metamorphosis').unsafePerformIO().unsafePerformIO();
console.log('t', t);
```

Por un lado está bien tener los efectos 'empaquetados' y listos para su consumo, por otro lado se hace raro este anidamiento. Veamos otro ejemplo más:

```js
const user = {
    name: 'Joe',
    addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
};

// safeProp :: Key -> { Key: a } -> Maybe a
const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

// firstAddressStreet :: User -> Maybe (Maybe (Maybe Street))
const firstAddressStreet = compose(
    map(map(safeProp('street'))),
    map(safeHead),
    safeProp('addresses'),
);

const t = firstAddressStreet({
    addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
});
// Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))

console.log(t);
```

Aquí volvemos a tener esta situación de tres functors anidados, donde nos aclara que existen tres puntos posibles de fallo dentro de nuestra función, pero de nuevo vemos que para alcanzar el valor debemos anidar multiples _map_.

Es el momento de introducir los _Monads_ para solventar esta situación

```js
const mmo = Maybe.of(Maybe.of('nunchucks'));
// Maybe(Maybe('nunchucks'))

mmo.join();
// Maybe('nunchucks')

const ioio = IO.of(IO.of('pizza'));
// IO(IO('pizza'))

ioio.join();
// IO('pizza')

const ttt = Task.of(Task.of(Task.of('sewers')));
// Task(Task(Task('sewers')));

ttt.join();
// Task(Task('sewers'))
```

Si tenemos dos capas del mismo tipo las podemos unificar usando `join`. Esto es lo que define a un __Monad__.

> Los Monads son pointed functors que pueden ser aplanados

Todo functor que defina `join`, que tenga un método `of` y obedezca una serie de leyes es un monad. 

```js
Maybe.prototype.join = function join() {
  return this.isNothing() ? Maybe.of(null) : this.$value;
};
```

Ahora que tenemos esta arma, vamos a refactorizar algún ejemplo anterior:

```js
// safeProp :: Key -> { Key: a } -> Maybe a
const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

// join :: Monad m => m (m a) -> m a
const join = mma => mma.join();

// firstAddressStreet :: User -> Maybe Street
const firstAddressStreet = compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead), 
  safeProp('addresses'),
);

const t = firstAddressStreet({
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
});
// Maybe({name: 'Mulburry', number: 8402})

console.log(t);
```

En el ejemplo anterior usamos _join_ donde sea que hubiera un _Maybe_ anidado. Veamos otro ejemplo con _IO_

> El código completo de esta demo: 03_algebraic_data_types/07_monads/io_example

> NOTA: Dejar a los alumnos que intenten sacar esta parte

```js
// applyPreferences :: String -> IO DOM
const applyPreferences = compose(
  join,
  map(setStyle('#main')),
  join,
  map(log),
  map(JSON.parse),
  getItem,
);

applyPreferences('preferences').unsafePerformIO();
```

```js
// log :: a -> IO a
const log = x => new IO(() => {
    console.log(x);
    return x;
});

// setStyle :: Selector -> CSSProps -> IO DOM
const setStyle = curry((sel, props) => new IO(() => {
    ManegerDOM(sel).css(props);
}));

// getItem :: String -> IO String
const getItem = key => new IO(() => localStorage.getItem(key));

const applyPreferences = compose(
    join,
    map(setStyle('main')),
    join,
    map(log),
    map(JSON.parse),
    getItem,
);

applyPreferences('preferences').unsafePerformIO();
```

`getItem` devuelve un `IO String` así que usamos `map` para pasearlo. Tanto `log` como `setStyle` devuelven un _IO_ así que debemos usar `join` para controlar el amidamiento.

## Chain

Podemos notar el siguiente patrón `join` justo detrás de un `map`.

```js
// chain :: Monad m => (a -> m b) -> m a -> m b
const chain = curry((f, m) => m.map(f).join());

// or

// chain :: Monad m => (a -> m b) -> m a -> m b
const chain = f => compose(join, map(f));
```

A esta función se le conoce con otros nombres como por ejmplo `flatMap`. 

### Ejercicio

Refactorizar los ejemplos anteriores utilizando `chain` en vez de `map/join`

```js
// map/join
const firstAddressStreet = compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead),
  safeProp('addresses'),
);

// chain
const firstAddressStreet = compose(
  chain(safeProp('street')),
  chain(safeHead),
  safeProp('addresses'),
);

// map/join
const applyPreferences = compose(
  join,
  map(setStyle('#main')),
  join,
  map(log),
  map(JSON.parse),
  getItem,
);

// chain
const applyPreferences = compose(
  chain(setStyle('#main')),
  chain(log),
  map(JSON.parse),
  getItem,
);
```

Una propiedad muy interesante de `chain` es que anida los efectos, podemos capturalos y ejecutarlos secuencialmente.

> Para los siguientes ejemplos hace falta el fichero de [helpers](03_algebraic_data_types\07_monads\playground\helpers.js)
> Implementar getJSON para ver como se integra Task

```js
// getJSON :: Url -> Params -> Task JSON
getJSON('/authenticate', { username: 'stale', password: 'crackers' })
  .chain((user) => getJSON('/friends', { user_id: user.id }))
  .fork(console.log, console.log);
// Task([ { id: 39, name: 'Ric' } ])

Maybe.of(3)
  .chain(three => Maybe.of(2).map(add(three)));
// Maybe(5);

Maybe.of(null)
  .chain(safeProp('address'))
  .chain(safeProp('street'));
  // Maybe(null);
```

## Notas

El estilo de programación con contenedores puede confundir a veces. Necesitamos saber como de profundo está enterrado nuestro dato, y aplicar `map` o `chain` de manera consecuente. Podemos siempre mejorar el debugging implementando `inspect`. Podemos hacer una comparativa, entre este estilo de programación y un estilo más iperativo


```js
// readFile :: Filename -> Either String (Task Error String)
// httpPost :: String -> String -> Task Error JSON
// upload :: String -> Either String (Task Error JSON)
const upload = compose(
  map(chain(httpPost('/uploads'))), 
  readFile
);
```

En contraste con una declaración más imperativa tenemos:

```js
// upload :: String -> (String -> a) -> Void
const upload = (filename, callback) => {
  if (!filename) {
    throw new Error('You need a filename!');
  } else {
    readFile(filename, (errF, contents) => {
      if (errF) throw errF;
      httpPost('/uploads', contents, (errH, json) => {
        if (errH) throw errH;
        callback(json);
      });
    });
  }
};
```

## Teoría

La primera ley que vamos a mirar es la asociativa

```js
// associativity
compose(join, map(join)) === compose(join, join);
```

> TODO: Añadir diagrama

La segunda ley es similar

```js
// identity for all (M a)
compose(join, of) === compose(join, map(of)) === id 
```

> TODO: Añadir diagrama

Las reglas anteriores son las que componen una `categoría`, pero para completar la definición necesitamos `composición`

```js
const mcompose = (f, g) => compose(chain(f), g);

// left identity
mcompose(M, f) === f;

// right identity
mcompose(f, M) === f;

// associativity
mcompose(mcompose(f, g), h) === mcompose(f, mcompose(g, h));
```

Los Monads forman un categoría llamada `Kleisli category`