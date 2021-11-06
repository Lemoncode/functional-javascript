## Un poco de Teoría

Los functors vienen de la `teoría de la categoría` y satisfacen una serie de leyes (reglas matemáticas)

```js
// identity
map(id) === id

// composition
compose(map(f), map(g)) === map(compose(f, g));
```

Podemos comprobar estas reglas mediante código, primero con respecto a la identidad

```js
const id = x => x;

const idLaw1 = map(id);
const idLaw2 = id;

idLaw1(Container.of(2));
// Container { '$value': 2 }
idLaw2(Container.of(2));
// Container { '$value': 2 }
```

Ahora con respecto a la composición

```js
const compLaw1 = compose(
    map(append(' world')),
    map(append(' cruel '))
);

const compLaw2 = map(
    compose(
        append(' world'),
        append(' cruel '),
    ));

compLaw1(Container.of('Goodbye'));
// Container { '$value': ' world cruel Goodbye' }
compLaw2(Container.of('Goodbye'));
// Container { '$value': ' world cruel Goodbye' }
```

En la teoría de la categoría, los `functors` toman los objetos y morfismos, y los mapean a una categoría diferente. Por definición, esta nueva categoría debe tener una **identidad** y la **habilidad de componer morfismos**.

Podemos pensar en una categoría como si fuera una red de objetos con morfismos que los conectan entre si. Así que un functor mapearía de una categoría a otra sin romper la red. Si un objecto está en la categoría _C_, cuando lo mapeamos a la categoría _D_ con el _functor F_, nos referimos a ese objeto como _F a_

> Añadir diagrama

Por ejemplo, _Maybe_ mapea nuestra categoría de tipos y funciones a una categoría donde cada objeto puede o no existir, cada morfismo tiene una comprobación de null. Esto lo conseguimos en código envolviendo cada función con map y cada tipo con nuestro functor.

Podemos visualizar el mapeo de un morfismo y sus correspondientes objetos con este diagrama:

> Añadir diagrama

Además de visualizar los morfismos mapeados de unacategoría a otra mediante el functor F, podemos ver que el diagrama conmuta, lo que quiere decir, es que si seguimos las flechas cada ruta produce el mismo resultado. Las diferentes rutas, sisgnifican distinto comportamiento, pero siempre terminan en el mismo tipo. Estas formulas son aplicables a nuestro código, veamos un ejemplo:

```js
```

> Añadir diagrama visual

Los functors se pueden apilar

```js
const nested = Task.of([Either.of('pillows'), left('no sleep for you')]);

map(map(map(toUpperCase)), nested);
// Task([Right('PILLOWS'), Left('no sleep for you')])
```

Lo que tenemos aquí con _nested_ es una array de futuros elementos que pueden ser errores. Hemos tenido que anidar _map_ dentro de _map_ para poder llegar al data. En vez de hacer _map(map(map(f)))_ podemos componer functors.

```js
class Compose {
  constructor(fgx) {
    this.getCompose = fgx;
  }

  static of(fgx) {
    return new Compose(fgx);
  }

  map(fn) {
    return new Compose(map(map(fn), this.getCompose));
  }
}

const tmd = Task.of(Maybe.of('Rock over London'));

const ctmd = Compose.of(tmd);

const ctmd2 = map(append(', rock on, Chicago'), ctmd);
// Compose(Task(Just('Rock over London, rock on, Chicago')))

ctmd2.getCompose;
// Task(Just('Rock over London, rock on, Chicago'))
```

La composición en los functors es asociativa, y hemos definido _Container_, el functor _Identidad_.  Si tenemos la identidad y la composición asociativa tenemos una categoría.
