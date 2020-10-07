## Composition

### Introducción

La composición más simple que podemos tener sería la siguiente:

```js
const compose2 = (f, g) => x => f(g(x));
```

Donde _f_ y _g_ son funciones, y _x_ es el valor que es pasado a través de ellas.

Utilizando la función anterior podemos generar el siguiente ejemplo:

```js
```