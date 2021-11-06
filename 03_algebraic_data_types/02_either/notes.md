## Manejo de Errores Puro

La realidad es que `throw/catch` no es muy puro. Vamos a ver una alternativa, `Either`

```js
class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${this.$value})`;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${this.$value})`;
    }
}

const left = x => new Left(x);
```

_Left_ y _Right_ son dos sub clases de un tipo abstracto que llamaremos _Either_

Algunos ejemplos sencillos serían

```js
Either.of('rain').map(str => `b${str}`);
// Right { '$value': 'brain' }
left('rain').map(str => `It's gonna ${str}, better bring your umbrealla!`);
// Left { '$value': 'rain' }
Either.of({ host: 'localhost', port: 80 }).map(prop('host'));
// Right { '$value': 'localhost' }
left('rolls eyes...').map(prop('host'));
// Left { '$value': 'rolls eyes...' }
```

_Left_ ignora las llamadas a map. _Right_ va a trabajar igual que _Container_ (Identity). Lo importante es poder embeber un error dentro de _Left_.

Veamos un ejemplo más práctico, supongamos que tenemos una función que puede fracasar. Vamos a calcular la edad a partir del cumpleaños. Podemos usar _Nothing_ para señalar el error y cambiar el flujo de nuestro programa, lo que ocurre es que eso no nos dice demasiado. Quizas, queramos saber exactamente cual fue el error. Podemos usar _Either_ para tal fin.

> NOTE: Install moment for this example

```js
// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate).format('YYYY-MM-DD');
    
    return moment(birthDate).isValid() ?
        Either.of(now.diff(birthDate, 'years')) : 
        left('Birth data could not be parsed');
});

getAge(moment(), { birthDate: '2005-12-12' });
// Right { '$value': 14 } 
getAge(moment(), { birthDate: 'Jly 4, 2001' });
// Left { '$value': 'Birth data could not be parsed' }

```

Ahora como con _Nothing_ (Maybe) nuestro programa se corto circuita cuando nos devuelven _Left_. La diferencia es que ahora tenemos información más precisa de lo que ha producido el error. Una cosa a tener en cuenta es que tenemos _Either(String, Number)_, con _String_ a la izquierda y _Number_ a la derecha.

## Ejercicio

Crear una función que devuelva la futura edad de un usuario dada la fecha de nacimiento. Pista: utilizar las funciones `getAge`, `add`, `compose` y `map`

Solución:

```js
const toString = (t) => t.toString();

// incAge :: Number -> String;
const incAge = compose(
    concat('If you survive, you will be'),
    toString,
    add(1)
);

const futureAge = compose(
    map(console.log),
    map(incAge),
    getAge(moment())
);

futureAge({ birthDate: '2005-12-12' });
// If you survive, you will be 15

futureAge({ birthDate: 'Not valid date' });
// Birth data could not be parsed
```

En el ejercicio anterior estamos ramificando el flujo de nuestro programa dependiendo de la validez de la fecha de nacimiento.

Notar que la función _incAge_ es totalmente ignorante de que es usada por un functor. En el momento que invocamos una función envuelta en _map_ se transfrma de una función __no-functor__ a una función __functor__. A esto es lo que le llamamos _lifting_. Las funciones tienden a funcionar mejor con tipos de datos normales antes que con los  tipos contenedores, en estos casos usamos _lifting_, para seguir trabajando con las mismas funciones.

_Either_ es más que un contenedor en la teoría de la caregoría, se le conoce como co-producto, es también el tipo de suma canónica (unión de conjuntos disjuntos), una posible refactorización del código anterior sería:


```js
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  let result;

  switch (e.constructor.name) {
    case 'Left':
      result = f(e.$value);
      break;

    case 'Right':
      result = g(e.$value);
      break;

    // No Default
  }

  return result;
});

const id = x => x;

const futureAge = compose(
    console.log,
    either(id, incAge),
    getAge(moment()),
);

futureAge({ birthDate: '2005-12-12' });

futureAge({ birthDate: 'Not valid date' });
```
