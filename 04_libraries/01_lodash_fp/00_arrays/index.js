const fp = require('lodash/fp');

// chunk
// Agrupa los elementos del array en subarrays de longitud n
const measures = [5.12, 42.20, 43.1, 0.10, 19.20, -32.1, 25.3, 22.2];
const groupedInPairs = fp.chunk(4, measures);
console.log(groupedInPairs);
//  [ 5.12, 42.2, 43.1, 0.1 ], [ 19.2, -32.1, 25.3, 22.2 ] ]

// difference
// Devuelve los items del primer array que no pertenezcan a los siguientes
const webLangs = ['Ruby', 'Python', 'JavaScript', 'PHP', 'Java', 'C#'];
const mobileLangs = ['Java', 'Objective-C', 'Swift', 'C#'];

let difference = fp.difference(webLangs, mobileLangs);
console.log(difference);
// [ 'Ruby', 'Python', 'JavaScript', 'PHP' ]

// differenceBy
// Igual que difference pero se le pasa una función que es aplicada antes
// de realizar la búsqueda
let positives = [14, 22, 5, 10, 20, 17, 53];
let negatives = [-16, -1, -15, -10, -71, -9, -5];

difference = fp.differenceBy(Math.abs, positives, negatives);
console.log(difference);
// [ 14, 22, 20, 17, 53 ]

// Se puede aplicar con colecciones objetos donde en lugar de una función
// se le pase una o varias propiedades
const animalCollection1 = [
    { type: 'dog', name: 'Mishka' },
    { type: 'hamster', name: 'Jasper' },
    { type: 'cat', name: 'Kata' },
];
const animalCollection2 = [
    { type: 'dog', name: 'Toby' },
    { type: 'cat', name: 'Luna' },
    { type: 'fish', name: 'Bob' },
];

difference = fp.differenceBy('type', animalCollection1, animalCollection2);
console.log(difference);
// [{ type: 'hamster', name: 'Jasper' }]

// differenceWith
// Igual que differenceBy pero en vez de un modificador se le pasa un comparador
// por cada elemento del primero se itera sobre todos los del segundo

const wordCollection1 = ['trabaja', 'plasma', 'las', 'palabras', 'hazlas', 'balas'];
const wordCollection2 = ['atrapa', 'ráfagas', 'sal', 'machaca', 'cada', 'sala'];

const sameLength = (element1, element2) => element1.length === element2.length;
difference = fp.differenceWith(sameLength, wordCollection1, wordCollection2);
console.log(difference);
// ['palabras', 'balas']


// Se puede aplicar a colecciones objetos
let coordinatesCollection1 = [
    { x: -10, y: 21 },
    { x: 30, y: -4 },
    { x: 12, y: 0 },
];
let coordinatesCollection2 = [
    { x: 3, y: 3 },
    { x: -1, y: 0 },
    { x: 12, y: -8 },
];

const sameY = (element1, element2) => element1.y === element2.y;
difference = fp.differenceWith(sameY, coordinatesCollection1, coordinatesCollection2);
console.log(difference);
// [{ x: -10, y: 21 }, { x: 30, y: -4 }]


// drop
// Elimina tantos elementos del principio como le especifiquemos
let notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do'];
let chunk = fp.drop(2, notes);
console.log(chunk);
// ['mi', 'fa', 'sol', 'la', 'si', 'do']


// dropRight
// Elimina tantos elementos del final como le especifiquemos
notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do'];
chunk = fp.dropRight(2, notes);
console.log(chunk);
// ['do', 're', 'mi', 'fa', 'sol', 'la']

// dropWhile
// Va eliminando elementos del principio hasta que la función da false
const multipleBy2And3 = (num) => num % 2 === 0 && num % 3 === 0;
let numbers = [18, 36, 48, 6, 96, 50, 48, 100, 4, 34, 67];
let result = fp.dropWhile(multipleBy2And3, numbers);
console.log(result);
// [50, 48, 100, 4, 34, 67]


// dropRightWhile (immutable)
// Va eliminando elementos del final hasta que la función da false
const lowerThan10 = (num) => num > 10;
numbers = [18, 36, 48, 6, 96, 50, 48, 100, 4, 34, 67];
result = fp.dropRightWhile(lowerThan10, numbers);
console.log(result);
// [18, 36, 48, 6, 96, 50, 48, 100, 4]

// flatten
// Aplana el array un nivel
let elements = [1, 2, [3, 4], [[5]], [[[6]]]];
let flattened = fp.flatten(elements);
console.log(flattened);
// [1, 2, 3, 4, [5], [[6]]]

// flattenDeep
// Aplana el array con profundidad
elements = [1, 2, [3, 4], [[5]], [[[6]]]];
flattened = fp.flattenDeep(elements);
console.log(flattened);
// [1, 2, 3, 4, 5, 6]

// flattenDepth
// Aplana el array con hasta la profundidad que le especifiques
elements = [1, 2, [3, 4], [[5]], [[[6]]]];
flattened = fp.flattenDepth(3, elements);
console.log(flattened);
// [1, 2, 3, 4, 5, 6]

// fromPairs
// Crea un array compuesto por parejas de clave-valor
const serializedArray = [
    ['name', 'Santiago'],
    ['password', 'test'],
    ['role', 'user'],
];
const user = fp.fromPairs(serializedArray);
console.log(user);
// { name: 'Santiago', password: 'test', role: 'user' }

// toPairs
// Crea un array basándose en las propiedades de un objeto y su valor
const style = {
    color: 'red',
    padding: 10,
    margin: 20,
    textTransform: 'uppercase',
};
const serialized = fp.toPairs(style);
console.log(serialized);
// [['color', 'red'], ['padding', 10], ['margin', 20], ['textTransform', 'uppercase']]

// intersection
// Crea un array con los valores que se repiten entre diferentes arrays
const frontend = ['HTML', 'CSS', 'JavaScript', 'WebAssembly'];
const backend = ['C#', 'Java', 'Python', 'JavaScript', 'Ruby'];
const repeatedLangs = fp.intersection(frontend, backend);
console.log(repeatedLangs);
// ['JavaScript']

// intersectionBy
// Realiza intersection aplicando previamente una función en los elementos
// Ojo! Coge los elementos del primer array si los elementos no son iguales
const twoSquared = (num) => Math.pow(num, 2);
positives = [17, 2, 10, 22, 5];
negatives = [-6, -14, -2, -5];
const sameSquare = fp.intersectionBy(twoSquared, positives, negatives);
console.log(sameSquare);
// [2, 5]


// Se pueden aplicar sobre objetos para obtener aquellos con las mismas propiedades
// Devuelve del primer array si son diferentes
let inputCollection1 = [
    { type: 'text', value: 'foo' },
    { type: 'number', value: 23 },
];
let inputCollection2 = [
    { type: 'email', value: 'user@example.com' },
    { type: 'text', value: 'user' },
];
let intersection = fp.intersectionBy('type', inputCollection1, inputCollection2);
console.log(intersection);
// [{ type: 'text', value: 'foo' }]

// intersectionWith
// Realiza intersection aplicando un comparador. Al igual que intersectionBy
// Si el elemento no es igual coge el del primer array
coordinatesCollection1 = [
    { x: 1, y: 3 },
    { x: 3, y: -1 },
];
coordinatesCollection2 = [
    { x: 3, y: 2 },
    { x: -1, y: 3 },
];

const lowerY = (coord1, coord2) => coord1.y < coord2.y;
intersection = fp.intersectionWith(lowerY, coordinatesCollection1, coordinatesCollection2);
console.log(intersection);
// [{ x: 3, y: -1 }]

// sortedIndex
// Devuelve el índice donde un elemento debería ser insertado para mantener el orden
// en el array
let sortedNumbers = [10, 20, 30, 40, 50];
let num = 25;
let index = fp.sortedIndex(num, sortedNumbers);
console.log(index);
// 2

// sortedIndexBy (inmutable)
// Ejecuta sortIndex pero aplicando previamente una función
sortedNumbers = [10, 20, 30, 40, 50];
num = 15;
let divideBy3 = (num) => num % 2 === 0 ? num / 2 : num;
index = fp.sortedIndexBy(divideBy3, num, sortedNumbers);
console.log(index);
// 2


// También con objetos
coordinates = [
    { x: 0, y: 3 },
    { x: 2, y: 5 },
    { x: 7, y: 8 },
    { x: 10, y: 10 },
];
coordinate = { x: 3, y: 12 };
index = fp.sortedIndexBy('x', coordinate, coordinates);
console.log(index);
// 2

// sortedLastIndex
// Como sortedIndex pero te devuelve el último índice aplicable
sortedNumbers = [1, 2, 2, 2, 3, 4, 5];
num = 2;
index = fp.sortedLastIndex(num, sortedNumbers);
console.log(index);
// 4

// sortedLastIndexBy
// Como sortIndexBy pero devolviendo el último índice aplicable
sortedNumbers = [10, 20, 30, 30, 30, 30, 40, 50];
num = 15;
divideBy3 = (num) => num % 2 === 0 ? num / 2 : num;
index = fp.sortedLastIndexBy(divideBy3, num, sortedNumbers);
console.log(index);
// 6

// También con objetos
coordinates = [
    { x: 0, y: 3 },
    { x: 2, y: 5 },
    { x: 2, y: 4 },
    { x: 2, y: 7 },
    { x: 7, y: 8 },
    { x: 10, y: 10 },
];
coordinate = { x: 2, y: 12 };
index = fp.sortedLastIndexBy('x', coordinate, coordinates);
console.log(index);
// 4

// union
// Devuelve un array de valores únicos de todos los arrays
let project1Empoyees = ['Anne', 'Paul', 'Jordi'];
let project2Employees = ['Alex', 'Jordi', 'Peter'];
let project3Employees = ['Peter', 'Jack', 'Mary'];
let employees = fp.union(project1Empoyees, project2Employees, project3Employees);
console.log(employees);
// ['Anne', 'Paul', 'Jordi', 'Alex', 'Peter', 'Jack', 'Mary']


// unionBy
// Devuelve un array de valores únicos entre arrays aplicándoles previamente una función
const getNameLength = (name) => name.length;
project1Empoyees = ['Anne', 'Paul', 'Jordi'];
project2Employees = ['Alex', 'Jordi', 'Peter'];
project3Employees = ['Peter', 'Jack', 'Mary'];
employees = fp.unionBy(getNameLength, project1Empoyees, project2Employees, project3Employees);
console.log(employees);
// ['Anne', 'Jordi']

// También con objetos
coordinatesCollection1 = [
    { x: 0, y: 3 },
    { x: 2, y: 5 },
    { x: 2, y: 4 },
];
coordinatesCollection2 = [
    { x: 0, y: 7 },
    { x: 1, y: 8 },
    { x: 2, y: 10 },
];
let union = fp.unionBy('x', coordinatesCollection1, coordinatesCollection2);
console.log(union);
// [{ x: 0, y: 3 }, { x: 2, y: 5 }, { x: 1, y: 8 }]

// unionWith
// Devuelve un array de valores únicos entre arrays mediante un comparador
// Primero saca los únicos del primer array y de ahí va mirando los siguientes
project1Empoyees = ['Anne', 'Paul', 'Jordi', 'Aaron'];
project2Employees = ['Jack', 'Peter', 'Mary', 'Janne'];
project3Employees = ['Alex', 'John', 'Bob', 'Patricia'];
const startsWithSameLetter = (emp1, emp2) => emp1.charAt(0) === emp2.charAt(0);
employees = fp.unionWith(startsWithSameLetter, project1Empoyees, project2Employees, project3Employees);
console.log(employees);
// ['Anne', 'Paul', 'Jordi', 'Mary', 'Bob']

// También con objetos
coordinatesCollection1 = [
    { x: 0, y: 3 },
    { x: 2, y: 0 },
    { x: 2, y: 4 },
];
coordinatesCollection2 = [
    { x: 4, y: 7 },
    { x: -2, y: 0 },
    { x: 0, y: 6 },
];
let equalsX = (coord1, coord2) => coord1.x === coord2.x;
union = fp.unionWith(equalsX, coordinatesCollection1, coordinatesCollection2);
console.log(union);
// [{ x: 0, y: 3 }, { x: 2, y: 0 }, { x: 4, y: 7 }, { x: -2, y: 0 }]

// uniq, sortedUniq
// Crea un array con valores únicos
elements = [7, 1, 5, 3, 4, 6, 3, 4, 7, 1];
let uniqueElements = fp.uniq(elements);
console.log(uniqueElements);
// [7, 1, 5, 3, 4, 6]

// uniqBy, sortedUniqBy
// Crea un array con valores únicos previamente pasados por una función
elements = [30, 54, 12, 32, 44, 10, 62, 4, 72];
const getTens = (num) => Math.trunc(num / 10);
uniqueElements = fp.uniqBy(getTens, elements);
console.log(uniqueElements);
// [30, 54, 12, 44, 62, 4, 72]

// También con objetos
const requests = [
    { method: 'GET', url: 'http://example.com' },
    { method: 'POST', url: 'http://google.es' },
    { method: 'PUT', url: 'http://lemoncode.net' },
    { method: 'GET', url: 'http//campus.lemoncode.net' },
    { post: 'DELETE', url: 'http://myapp.com/api/users/11' },
];
const uniqueRequestsByMehtod = fp.uniqBy('method', requests);
console.log(uniqueRequestsByMehtod);
// [
//   { method: 'GET', url: 'http://example.com' },
//   { method: 'POST', url: 'http://google.es' },
//   { method: 'PUT', url: 'http://lemoncode.net' },
//   { post: 'DELETE', url: 'http://myapp.com/api/users/11' }
// ];

// uniqWith
// Al igual que uniq pero comparando elementos
elements = [30, 54, 12, 32, 44, 10, 62, 4, 72];
const biggerThanElementPlus10 = (num1, num2) => num2 + 10 > num1;
uniqueElements = fp.uniqWith(biggerThanElementPlus10, elements);
console.log(uniqueElements);
// [30, 54, 72]

// También con objetos
elements = [
    { url: 'www.example.com/hello', id: 22 },
    { url: 'www.example.com/hello', id: 22 },
    { url: 'www.example.com/hello-how-are-you', id: 23 },
    { url: 'www.example.com/i-like-pie', id: 24 }
];
const sameId = (req1, req2) => req1.id === req2.id;
uniqueElements = fp.uniqWith(sameId, elements);
console.log(uniqueElements);
// [
//   { url: 'www.example.com/hello', id: 22 },
//   { url: 'www.example.com/hello-how-are-you', id: 23 },
//   { url: 'www.example.com/i-like-pie', id: 24 }
// ]

// without (inmutable), pull (mutable)
// Crea un array excluyendo los elementos que les pasemos como parámetros
// const _elements = ['lorem', 'ipsum', 'dolor', 'sit', 'amen'];
// const healtherElements = fp.without('dolor', _elements);
// console.log(healtherElements);
// ['lorem', 'ipsum', 'sit', 'amen']

// xor (inmutable)
// Crea un array con la diferencia simétrica entre los arrays pasados como parámetros
project1Empoyees = ['Anne', 'Paul', 'Jordi'];
project2Employees = ['Alex', 'Jordi', 'Paul'];
project3Employees = ['Jordi', 'Jack', 'Anne'];
let symDiff = fp.xor(project1Empoyees, project2Employees, project3Employees);
console.log(symDiff);
// ['Alex', 'Jack']

// xorBy (inmutable)
// Igual que xor pero aplicando una función previamente
const measures1 = [1.2, 4.2, 3.9, 4.6, 3.5, 5.5];
const measures2 = [6.3, 3.5, 2.3, 8.7, 1.8, 9.0];
symDiff = fp.xorBy(measures1, measures2, Math.floor);
console.log(symDiff);
// [4.2, 5.5, 6.3, 2.3, 8.7, 9]

// También con objetos
let group1 = [
    { id: 12, name: 'Jennefer' },
    { id: 31, name: 'George' },
    { id: 21, name: 'Paula' },
];
let group2 = [
    { id: 31, name: 'George' },
    { id: 11, name: 'Jeb' },
    { id: 12, name: 'Jennefer' },
];
symDiff = fp.xorBy('name', group1, group2);
console.log(symDiff);
// [{ id: 21, name: 'Paula' }, { id: 11, name: 'Jeb' }]

// xorWith (inmutable)
// Crea un array con la diferencia simétrica aplicando un comparador
// Si da verdadero considera que son iguales. También elimina duplicados.
group1 = [3, 6, 1, 3, 8];
group2 = [12, 2, 14, 37];
const method = (num1, num2) => num1 % 2 === 0 && num1 > num2;
symDiff = fp.xorWith(group1, group2, method);
console.log(symDiff);
// [3, 1, 3, 37]

// También con objetos
coordinatesCollection1 = [
    { x: 0, y: 3 },
    { x: 2, y: 0 },
    { x: 2, y: 4 },
];
coordinatesCollection2 = [
    { x: 4, y: 7 },
    { x: -2, y: 0 },
    { x: 0, y: 6 },
];
equalsX = (coord1, coord2) => coord1.x === coord2.x;
symDiff = fp.xorWith(equalsX, coordinatesCollection1, coordinatesCollection2);
console.log(symDiff);
// [{ x: 2, y: 0 }, { x: 4, y: 7 }, { x: -2, y: 0 }]