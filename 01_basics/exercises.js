const { map, compose, head, toUpperCase, split, intercalate, last, curry, prop } = require('../utils/operators');

// ## Ejercicio. Jugando con Point Free. 
const name = 'jaime salas zancada'
const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));
console.log(initials(name));
// ## Ejercicio. Jugando con Point Free. 

const books = [
    {
        title: 'El Señor de las Moscas',
        sold_units: 100000,
        price: 12.00,
        in_stock: true,
    },
    {
        title: 'La Reina de las Corrientes de Aire',
        sold_units: 700000,
        price: 11.00,
        in_stock: false,
    },
    {
        title: 'El Padrino',
        sold_units: 1700000,
        price: 28.00,
        in_stock: true,
    },
];

// ## Ejercicio 1
const isLastInStock = compose(prop('in_stock'), last);
console.log(isLastInStock(books));
// ## Ejercicio 1

// ## Ejercicio 2
const add = curry((x, y) => x + y);
const reduce = curry((f, init, xs) => xs.reduce(f, init));
const avarage = xs => reduce(add, 0, xs) / xs.length;

const avarageSoldUnits = compose(avarage, map(prop('sold_units')));
console.log(avarageSoldUnits(books));
// ## Ejercicio 2

// ## Ejercicio 3
const sortBy = curry((prop, xs) => xs.sort((a, b) => a[prop] - b[prop]));
const concat = curry((what, s) => `${s}${what}`);

const bestPrice = compose(concat(' is the more cheap'), prop('title'), last, sortBy('price'));
console.log(bestPrice(books));
// ## Ejercicio 3