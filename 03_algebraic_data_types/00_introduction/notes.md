## Introducción

Hemos escrito programas que pasan los datos a través de una serie de funciones puras. Son declaraciones epecíficas de comportamineto. ¿Per que hay del control de flujo, maneo de errores, acciones asíncronas, el estado y los side effects?

Vamos a contruir un contenedor. Un objeto plano desde el punto de vista de OO.

```js
class Container {
    constructor(x) {
        this.$value = x;
    }

    static of(x) {
        return new Container(x);
    }
}
```

Notar que utilizando el operador `of` no necesitamos escribir `new`

```js
Container.of(3);

Container.of('hotdogs');

Container.of(Container.of({ name: 'guarrito' }));

// Container { '$value': 3 } Container { '$value': 'hotdoogs' } Container { '$value': Container { '$value': { name: 'guarrito' } } }
```

* __Container__ es un objeto con una propiedad. Hemos llamado de manera arbitraria a esta propiedad __$value__.

* La propiedad __$value__ no puede ser de un tipo específico, ya que nuestro contenedor dejaría de ser útil.

* Una vez que el data entra en __Container__  permanece ahí. Podemos recuperarlo usando __.$vlaue__

## Functor

Una vez que el valor se encuentra dentro del contenedor, necesitamos algún mecanismo para ejcutar las funciones sobre el mismo:

```js
class Container {
    //---- more code above -----

    // (a -> b) Container a -> Container b
    map(f) {
        return Container.of(f(this.$value));
    }
}
```

Es exactamente igual que el `map` de un array.

```js
const concat = curry((what, s) => `${s}${what}`);

Container.of(2).map(two => two + 2);
// Container { '$value': 4 }
Container.of('bazinga').map(s => s.toUpperCase());
// Container { '$value': 'BAZINGA' }
Container.of('tirar').map(concat(' dado')).map(prop('length'));
// Container { '$value': 10 }
```

Podemos trabajar con el data sin aboandonar _Container_. El valor de nuestro contenedor es manejado por `map` devolviendo un __nuevo contenedor__. Cómo resultado de nunca abandonar el contenedor podemos continuar usando `map` e incluso cambiar el tipo como hemos visto en los ejemplos anteriores. Pero no lo llamemos `map`, acabamos de descrubir el __Functor__.

> Un Functor es un tipo que implementa map y sigue una serie de leyes matemáticas

Un __Functor__ es simplemente una interfaz y su contrato.

¿Qué ganamos al hacer que el contenedor ejecute las funciones por nosotros? Abstracción de la aplicación de la función. Cuando mapeamos la función, le estamos pidiendo al contenedor que la ejecute por nosotros.


