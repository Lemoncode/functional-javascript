## Utilizando Aplicaciones

Esta interfaz nos proporciona la habilidad de para aplicar functors entre ellos. ¿Pero qué significa aplicar functors entre ellos? 

Pongamos un ejemplo, digamos hipotéticamente que tenemos dos functors (de el miso tio) y queremos llamar a una función, con de sus valores como argumentos. Algo tan tonto como sumar el valor de dos _Containers_

```js
// We can't do this because the numbers are bottled up.
add(Container.of(2), Container.of(3));
// NaN

// Let's use our trusty map
const containerOfAdd2 = map(add, Container.of(2));
// Container(add(2))
```

Tenemos un `Container` con una función parcialmente aplicada dentro. Específicamente tenemos `Container(add(2))` y queremos aplicar su `add(3)` al `3` en un `Cntainer(3)` para completar la llamada. En otras palabras, queremos aplicar un functor a otro.

Lo podemos hacer de la siguiente manera

```js
Container.of(2).chain((two) => Container.of(3).map(add(two)));
// Container { '$value': 5 }
```

El problema aquí es que estamos atrapados en el mundo secuencial de los _monads_ en el que nada puede ser evaluado hasta que el _monad_ previo no ha terminado. No tiene sentido retrasar la creación de _Container(3)_ hasta que se haya producido la de _Container(2)_ ya que ambos son indepedientes entre si.

## la función ap

`ap` es una función que puede aplicar los contenidos de una función de un functor al valor contenido en otro:

```js
const x = Container.of(add(2)).ap(Container.of(3)); // [1]
// Container { '$value': 5 }
const y = Container.of(2).map(add).ap(Container.of(3));
// Container { '$value': 5 }
console.log(x, y);
```

Tener en cuenat que `add`, está parcialmente aplicada en el primer `map`, así que esto solo funciona si add es una función con curry aplicado-

Podemos definir `ap` como:

```js
Container.prototype.ap = function (otherContainer) {
  return otherContainer.map(this.$value);
}
```

Notar que `this.$value` será una función (en 1 `add`) y estaremos aceptando otro functor, así que sólo necesiatamos `map`. Y con esto tenemos nuestra definición de interfaz:

> Un applicative functor es un pointed functor com un método _ap_

Le `pointed` interfaz es fundamental aquí

```js
F.of(x).map(f) === F.of(f).ap(F.of(x));
```

Mapear `f` es equivalente a hacer `ap` a un functor de `f`. O podemos poner `x` en nuestro container y `map(f)` o podemos hacer _lift_ en `f` y en `x` dentro de nuestro contenedor y aplicar `ap`. Esto nos permite escribir de izquierda a derecha:

```js
Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Maybe(5)

Task.of(add).ap(Task.of(2)).ap(Task.of(3));
// Task(5)
```

## Coordinación