const fp = require('lodash/fp');

// countBy
// Crea un objeto cuya clave es el resultado de aplicar la función especificada y cuyo valor es
// el número de elementos que devuelven el mismo resultado
let elements = ['Matt', 'Jane', 'Eva', 'Tristan', 'Jax'];
console.log(fp.countBy('length', elements));
// { '3': 2, '4': 2, '7': 1 }

// groupBy
// Crea un objeto cuya clave es el resultado de aplicar la función especificada y cuyo valor el
// conjunto de elementos que devuelven el mismo resultado
elements = ['Matt', 'Jane', 'Eva', 'Tristan', 'Jax'];
console.log(fp.groupBy('length', elements));
// {
//   '3': ['Eva', 'Jax'],
//   '4': ['Matt', 'Jane'],
//   '7': ['Tristan']
// }

// keyBy
// Crea un objeto cuya clave es el resultado de aplicar la función especificada y cuyo valor el
// objeto al que se le aplicó la función
elements = ['Matt', 'Jane', 'Eva', 'Tristan', 'Jax'];
console.log(fp.keyBy('length', elements));
// { '3': 'Jax', '4': 'Jane', '7': 'Tristan' }

// orderBy
// Ordena los elementos por una o múltiples propiedades y diferente orden
let users = [
    { name: 'Mika', age: 40 },
    { name: 'Alan', age: 34 },
    { name: 'John', age: 34 },
    { name: 'Fred', age: 48 },
    { name: 'Paul', age: 36 },
];
console.log(fp.orderBy('name', 'desc', users));
// [
//   { name: 'Paul', age: 36 },
//   { name: 'Mika', age: 40 },
//   { name: 'John', age: 34 },
//   { name: 'Fred', age: 48 },
//   { name: 'Alan', age: 34 }
// ]


// Ordenar por varios campos
console.log(fp.orderBy(['age', 'name'], ['asc', 'desc'], users));
// [
//   { name: 'John', age: 34 },
//   { name: 'Alan', age: 34 },
//   { name: 'Paul', age: 36 },
//   { name: 'Mika', age: 40 },
//   { name: 'Fred', age: 48 }
// ]

// partition
// Separa los elementos del array según el resultado booleano de ejecutar la función especificada
let numbers = [1, 7, 2, 5, 3, 9, 1, 6];
let greaterThan5 = (num) => num > 5;
console.log(fp.partition(greaterThan5, numbers));
// [[7, 9, 6], [1, 2, 5, 3, 1]]

users = [
    { name: 'Mika', age: 40, active: false },
    { name: 'John', age: 34, active: true },
    { name: 'Fred', age: 48, active: true },
    { name: 'Paul', age: 36, active: false },
];
console.log(fp.partition('active', users));
// [
//   [{ name: 'John', age: 34, active: true }, { name: 'Fred', age: 48, active: true }],
//   [{ name: 'Mika', age: 40, active: false }, { name: 'Paul', age: 36, active: false }]
// ]

// reject
// El opuesto a filter. Devuelve aquellos elementos que no cumplan la condición.
numbers = [1, 7, 2, 5, 3, 9, 1, 6];
greaterThan5 = (num) => num > 5;
console.log(fp.reject(greaterThan5, numbers));
// [1, 2, 5, 3, 1]


users = [
    { name: 'Mika', age: 40, active: false },
    { name: 'John', age: 34, active: true },
    { name: 'Fred', age: 48, active: true },
    { name: 'Paul', age: 36, active: false },
];
console.log(fp.reject('active', users));
// [{ name: 'Mika', age: 40, active: false }, { name: 'Paul', age: 36, active: false }]

// sample
// Devuelve un elemento escogido de forma aleatoria. Aplicable tanto a arrays como objects
console.log(fp.sample([10, 7, 3, 6, 1, 4, 16, 8, 2, 31])); // random
console.log(fp.sample({ foo: 'bar', bar: 'baz', bax: 'bat' })); // random value

// sampleSize
// Devuelve tantas muestras aleatorias como especifiquemos
console.log(fp.sampleSize(4, [10, 7, 3, 6, 1, 4, 16, 8, 2, 31])); // 4 números random
console.log(fp.sampleSize(2, { x: 13, y: -1, z: 0 })) // 2 random values

// shuffle
// Desordena los elementos de un array o las propiedades de un objeto
console.log(fp.shuffle([1, 2, 3, 4, 5])); // random
console.log(fp.shuffle({ x: 13, y: -1, z: 0 })); // random property list

// sortBy
// Ordena en modo ascendente los elementos de un array según la función que pasemos como parámetro
// En caso de objeto se puede ordenar pasándole la propiedad
users = [
    { name: 'Mika', age: 40, active: false },
    { name: 'John', age: 34, active: true },
    { name: 'John', age: 21, active: false },
    { name: 'Fred', age: 48, active: true },
    { name: 'Paul', age: 36, active: false },
];
console.log(fp.sortBy('name', users));
// [
//   { name: 'Fred', age: 48, active: true },
//   { name: 'John', age: 34, active: true },
//   { name: 'John', age: 21, active: false },
//   { name: 'Mika', age: 40, active: false },
//   { name: 'Paul', age: 36, active: false }
// ]


// Por varios campos
console.log(fp.sortBy(['name', 'age'], users));
  // [
  //   { name: 'Fred', age: 48, active: true },
  //   { name: 'John', age: 21, active: false },
  //   { name: 'John', age: 34, active: true },
  //   { name: 'Mika', age: 40, active: false },
  //   { name: 'Paul', age: 36, active: false }
  // ]