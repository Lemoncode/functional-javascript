## Hindler-Milner

Los tipos son el meta dato que hace que podamos utilizar los mismos mapas mentales en distintos lenhuajes funcionales. En su mayor parte se escriben en un sistema que recibe el nombre de **Hindler-Milner**

## Ejemplos

```javascript
// capitalize :: String -> String
const capitalize = s => toUpperCase(head(s)) + toLowerCase(tail(s));

capitalize('smurf');
```

Aquí la función _capitalize_ toma una _String_ y devuelve una _String_.

En _Hindler-Milner_, las funciones son escritas como `a -> b` donde _a_ y _b_ son variables para cualquier tipo. Así la firma de _capitalize_ puede ser leida como "una función de _String_ a _String_". En otras palabras toma un _String_ y devuelve un _String_.

```javascript
// strLength :: String -> Number
const strLength = s => s.length;

// join :: String -> [String] -> String
const join = curry((what, xs) => xs.join(what));

// match :: Regex -> String -> [String]
const match = curry((reg, s) => s.match(reg));

// replace :: Regex -> String -> String -> String
const replace = curry((reg, sub, s) => s.replace(reg, sub));
```

_strLength_ es la misma idea qu e la anterior función, pero aquí en vez de devolver una string estamos devolviendo un número. El resto de funciones la primera vez que se ven pueden resultar un poco chocantes. Lo que es importante es que la última parte siempre es el tipo devuelto por la función. Así por ejemplo _match_ puede ser interpretado como: toma un _Regex_ y un _String_ y devuelve _[String]_.

Para _match_ podemos agrupar la firma de la función de la siguiente manera:

```javascript
// match :: Regex -> (String -> [String])
const match = curry((reg, s) => s.match(reg));
```

Ahora se ve como una función que toma un _Regex_ y devuelve una función que va de _String_ a _[String]_. Gracias al **curry** es realmnete lo que está ocurriendo aquí.


```javascript
// match :: Regex -> (String -> [String])
// onHoliday :: String -> [String]
const onHoliday = match(/holiday/ig);
```

_onHoliday_ es un _match_ que ya tiene asignado un tipo _Regex_

```javascript
// replace :: Regex -> (String -> (String -> String))
const replace = curry((reg, sub, s) => s.replace(reg, sub));
```

Aquí en _replace_ los parentesis comienzan a meter algo de ruido, podemos omitirlos. Es más fácil verlo como que toma un tipo _Regex_ un _String_ y otro _String_ y devuelve un _String_.

```javascript
// id :: a -> a
const id = x => x;

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, xs) => xs.map(f));
```

La función _id_ toma cualquier tipo _a_ y devuelve el mismo tipo _a_. `a -> b` pueden ser de cualquier tipo desde _a_ a culaquier tipo en _b_, pero `a -> a` significa que tienen que ser del mismo tipo. En el caso anterior podemos decir _String -> String_ pero no _String -> Number_.

La función _map_ introduce _b_ que puede ser o no ser del mismo tipo que _a_. La podemos leer como: _map_ toma una función desde cualquier tipo _a_ a el mismo o un tipo diferente _b_, después toma un array de _a's_ y devuelve un array de _b's_


Más ejemplos:


```javascript
// head :: [a] -> a
const head = xs => xs[0];

// filter :: (a -> Bool) -> [a] -> [a]
const filter = curry((f, xs) => xs.filter(f));

// reduce :: ((b, a) -> b) -> b -> [a] -> b
const reduce = curry((f, x, xs) => xs.reduce(f, x));
```

### Parametricidad

Cuando introducimos los tipos como variables, emerge una propiedad llamada [parametricity](https://en.wikipedia.org/wiki/Parametricity). Esta propiedad establece que una función actuará en todos los tipos de manera uniforme.

```javascript
// head :: [a] -> a
// reverse :: [a] -> [a]
```

¿Qué es lo que hacen las funciones anteriormente descritas? Lo que podemos decir es que en el primer caso _head_ recibe un array de un tipo y devuelve un elemento del mismo tipo, y que _reverse_ recive un array de un tipo determinado y devuelve un array del mismo tipo, más allá de eso simplemente podemos expecular. Lo realmente interesante a notar aquí es el carácter polimórfico de ambas funciones.

Este tipo de razonamiento nos lleva a poder trabajar con ciertos teoremas, [Wadler's paper on the subject](https://ttic.uchicago.edu/~dreyer/course/papers/wadler.pdf).

```javascript
// head :: [a] -> a
compose(f, head) === compose(head, map(f));

// filter :: (a -> Bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f));
```

La primera dice que si tomamos el primer elemento de un array, depués ejecutamos una función _f_ sobre el elemento, eso es equivalente a, que hagamos _map(f)_ sobre todos los elemnetos y después nos quedemos con el primer elemento del array.

La segunda es similar, nos dice que si componemos _f_ y _p_ para comprobar que elementos son filtrados y después aplicamos _f_ via _map_ (filter no va a transformar los elementos) siempre va a ser equivalente a mapear con _f_ y después filtrar el reseultado usando el predicad _p_.

### Restricciones

Podemos restringir los tipos a una interfaz.

```javascript
// sort :: Ord a => [a] -> [a]
```

Lo que leemos aquí es que _a_ debe implementar _Ord a_. ¿Qué es `Ord a`? En lenguaje tipado será una interfaz que declaré que podemos hacer un determinado tipo de operación sobre un elemento. No sólo nos habla más de _a_, si no que además nos restringe su dominio. A estas declaracione de interfaces las llamamos _restricciones de tipo_.

```javascript
// assertEqual :: (Eq a, Show a) => a -> a -> Assertion
```