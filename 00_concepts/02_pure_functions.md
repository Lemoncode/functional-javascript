## Funciones puras

> Una función pura es una función que, dada la misma entrada, siempre devolverá la misma salida y NO tiene ningún efecto colateral que podamos observar.

### Ejemplos

slice vs splice

```js
const { inspect } = require('util');

const xs = [1, 2, 3, 4, 5];

const it1 = xs.slice(0, 3);
const it2 = xs.slice(0, 3);
const it3 = xs.slice(0, 3);

console.log(inspect(it1));
console.log(inspect(it2));
console.log(inspect(it3));

const it4 = xs.splice(0, 3);
const it5 = xs.splice(0, 3);
const it6 = xs.splice(0, 3);

console.log(inspect(it4));
console.log(inspect(it5));
console.log(inspect(it6));
```

Otro ejemplo no tan evidente:

```js
// impure 
let minNameLength = 5;
const checkNameLength = (name) => name.length >= minNameLength;

// pure
const checkNameLength = (name) => {
    const minNameLength = 5;
    return name.length >= minNameLength
};
```

La primera función depende de una variable que puede mutar, depende del estado global del sistema. Podemos referirnos a un efecto (_effect_) a cualquier cosa que ocurra en nuestros programas que no sea el calculo del resultado.

> Un _side effect_ es un cambio del estado del sistema o una interacción observable con el mundo exterior que ocurre durante el cálculo de un resultado.

* Ejemplos de _side effects_
    - Un cambio en el sistema de ficheros.
    - Actualizar un registro en base de datos.
    - Una llamada http.
    - Mutar. 
    - Invocar _console.log_.
    - Usar _Matth.random_ o _Date.now_.
    - Recuperar una entrada del usuario.
    - Buscar elementos en el DOM.
    - Acceder al estado global de un sistema.

Cualquier interacción con el mundo exterior fuera de una función es un _side effect_. La filosofía de la programación funcional nos dice que los side effects son la primera causa de un funcionamiento erróneo.

Una función es simplemente la relación entre dos valores: la entrada y la salida:

```js
// pure
const abs = (x) => Math.abs(x);

console.log(abs(5));
console.log(abs(-5));
```

### Cuando las funciones son puras

#### Cache

Las funciones puras se pueden siempre guardar en cache por cada entrada:

```js
const memoize = require('../utils/memoize');

const multiplyByTwo = memoize(x => x * 2);

console.log(multiplyByTwo(2)); // 4
console.log(multiplyByTwo(2)); // 4, returns from cache
console.log(multiplyByTwo(5)); // 10
console.log(multiplyByTwo(5)); // 10, returns from cache
```

#### Portables

Todo lo que necesita una función pura, está contenida en la propia función. Debemos tener en cuenta que esto implica "inyectar" las dependencias de la función o pasarlas como argumentos:

```js
// impure
const signUp = (attrs) => {
  const user = saveUser(attrs);
  welcomeUser(user);
};

// pure
const signUp = (Db, Email, attrs) => () => {
  const user = saveUser(Db, attrs);
  welcomeUser(Email, user);
};
```

[Joe Armstrong](https://en.wikipedia.org/wiki/Joe_Armstrong_(programmer)) _The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana... and the entire jungle_

#### Testeables

Las funciones puras son mucho más fáciles de testear.

#### Razonables

__Transparencia Referencial__. Un punto de nuestro código es transparente referencialmente, cuando puede ser substituido por su valor evaluado, sin cambiar el comportamiento del programa.

Como las funciones puras no tienen _side effects_, sólo pueden influenciar el comportamiento del programa a través de sus valores de salida.


```js
const { Map } = require('immutable');

const lau = Map({ name: 'Lau', health: 20, team: 'miyagi' });
const jai = Map({ name: 'jai', health: 10, team: 'cobra' });

const decrementHealth = (fighter) => fighter.set('health', fighter.get('health') - 1);
const isSameTeam = (f1, f2) => f1.get('team') === f2.get('team');
const attack = (attacker, defender) => (isSameTeam(attacker, defender) ? defender : decrementHealth(defender));

const defender = attack(lau, jai);

console.log(lau.get('health'), jai.get('health'));
console.log(defender.get('health'));
```

Todas las funciones anteriores son puras y por tanto _transparentes referencialmente_. Podemos usar una técnica _razonamiento equitativo_ en la cuál podemos substituir "igual por igual" para razonar acerca del código.

```diff
const { Map } = require('immutable');

const lau = Map({ name: 'Lau', health: 20, team: 'miyagi' });
const jai = Map({ name: 'jai', health: 10, team: 'cobra' });

const decrementHealth = (fighter) => fighter.set('health', fighter.get('health') - 1);
const isSameTeam = (f1, f2) => f1.get('team') === f2.get('team');
-const attack = (attacker, defender) => (isSameTeam(attacker, defender) ? defender : decrementHealth(defender));
+const attack = (attacker, defender) => (attacker.get('team') === defender.get('team') ? defender : decrementHealth(defender));

const defender = attack(lau, jai);

console.log(lau.get('health'), jai.get('health'));
console.log(defender.get('health'));
```

Cómo nuestros datos son inmutables, podemos substituir por su valor:

```diff
const { Map } = require('immutable');

const lau = Map({ name: 'Lau', health: 20, team: 'miyagi' });
const jai = Map({ name: 'jai', health: 10, team: 'cobra' });

const decrementHealth = (fighter) => fighter.set('health', fighter.get('health') - 1);
const isSameTeam = (f1, f2) => f1.get('team') === f2.get('team');
-const attack = (attacker, defender) => (attacker.get('team') === defender.get('team') ? defender : decrementHealth(defender));
+const attack = (attacker, defender) => ('miyagi' === 'cobra' ? defender : decrementHealth(defender));

const defender = attack(lau, jai);

console.log(lau.get('health'), jai.get('health'));
console.log(defender.get('health'));
```

Esta evaluación de código va a ser siempre falsa, 

```js
'miyagi' === 'cobra'
```

por lo que podemos modificar el código por:

```diff
const { Map } = require('immutable');

const lau = Map({ name: 'Lau', health: 20, team: 'miyagi' });
const jai = Map({ name: 'jai', health: 10, team: 'cobra' });

const decrementHealth = (fighter) => fighter.set('health', fighter.get('health') - 1);
const isSameTeam = (f1, f2) => f1.get('team') === f2.get('team');
-const attack = (attacker, defender) => ('miyagi' === 'cobra' ? defender : decrementHealth(defender));
+const attack = (attacker, defender) => decrementHealth(defender);

const defender = attack(lau, jai);

console.log(lau.get('health'), jai.get('health'));
console.log(defender.get('health'));
```

Ahora es trivial darse cuenta de que `attack` es una llamada a `decrementHealth`. Está técnica es genial a la hora de refactorizar y entender el código en general.

#### Paralelismo

Podemos ejecutar cualquier función pura en paralelo desde que no necesita acceso a memoria compartida, por lo que no se pueden dar condiciones de carrera.