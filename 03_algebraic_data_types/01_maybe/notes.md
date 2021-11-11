# Maybe

_Container_ es bastante aburrido, no hace mucho, en realidad se le conoce como _Identity_. Existen otros functors, los cuales nos proporcionan un comportamiento más útiles. 

```js
class Maybe {
    static of(x) {
        return new Maybe(x);
    }

    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }

    constructor(x) {
        this.$value = x;
    }

    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }

    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
    }
}
```

_Maybe_ se parece mucho a _Container_ con la diferencia de que primero comprueba que tiene valor antes de invocar la función que le hemos alimentado.


```js
Maybe.of('patata patata').map(match(/a/ig));
// Maybe { '$value': [ 'a', 'a', 'a', 'a', 'a', 'a' ] }

Maybe.of(null).map(match(/a/ig));
// Maybe { '$value': null }

Maybe.of({ name: 'Jacob' }).map(prop('age')).map(add(10));
// Maybe { '$value': undefined }

Maybe.of({ name: 'Lua' , age: 8}).map(prop('age')).map(add(10));
//Maybe { '$value': 18 }

```

Notar que no obtenemos excepciones no controladas al utilizar map sobre null o undefined. Gracias a que _Maybe_ se preocupa por comprobar el valor cada vez que apliquemos una función.

Por supuesto podemos seguir manteniendo `freepoint style`.

```javascript
// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, anyFunctor) => anyFunctor.map(f));
```

_Functor f =>_ nos dice que _f_ debe ser un Functor.

## Casos de uso

_Maybe_ se usa en funciones que pueden fallar al devolver un valor.

Dado el siguiente tipo de datos:

```js
const input = { 
    addresses: [{ street: 'Shady Ln.', number: 4201 }] 
}
```

Queremos extraer el nombre de la calle de manera segura:

```js
// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = compose(
    map(prop('street')),
    safeHead,
    prop('addresses')
);

```

Ahora lo podemos verificar de la siguiente manera:

```js
streetName({ addresses: [] });
// Maybe { '$value': undefined }
streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] });
// Maybe { '$value': 'Shady Ln.' }
```

_safeHead_ es como _head_ añadiendo un tipo seguro.

Otro ejemplo, podemos devolver un valor _Nothing_ para señalar que una determinada operación ha fallado.

Dado el siguiente tipo de datos:

```js
const input = {
    balance: 100,
};
```

Podemos escribir

```js
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, {balance}) => Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is ${balance}`;

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(
    map(remainingBalance),
    withdraw(20)
);

getTwenty({ balance: 200 });
// Maybe { '$value': 'Your balance is 180' }

getTwenty({ balance: 10 });
// Maybe { '$value': null }
```

## Liberando el valor

En un punto determinado el data debe abondanar nuestros contenedoere, devolver un JSON, imprimir un determiado valor en pantalla... Un error común es sacar el valor directamente de _Maybe_, pero esto sería un error, ya que hay que recordar que _Maybe_ puede contener o no valor. 

Para tal fin podemos implementar:

```js
// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }

  return f(m.$value);
});
```

Y en el ejemplo anterior aplicaría de la siguiente manera:

```diff
const getTwenty = compose(
+   maybe('No money', remainingBalance),
-   map(remainingBalance),
    withdraw(20)
);
```

Devolviendo

```js
getTwenty({ balance: 200 });
// Your balance is 180
getTwenty({ balance: 10 });
// No money
```

Notar que la  función _maybe_ es el equivalente a un _if/else_. _Maybe_ separa en dos tipos: uno para `algo` y el otro para `nada`. Esto nos permite obedecer la parametricidad en _map_ así valores como `null` o `undefined` pueden seguier siendo mapeados y la cualificación total del valor en un Functor será respetada.  
