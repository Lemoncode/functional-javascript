const R = require('ramda');

const pets = [
    { name: 'Jeans', price: 80, category: 'cat', weight: 100 },
    { name: 'Hoodie', price: 50, category: 'cat', weight: 20 },
    { name: 'Sneakers', price: 120, category: 'cat', weight: 30 },
    { name: 'Doody', price: 35, category: 'dog', weight: 10 },
    { name: 'Bubbles', price: 649, category: 'fish', weight: 5 },
    { name: 'Metal', price: 100, category: 'reptile', weight: 200 },
];

// const predicate = pet => pet.category === 'cat' && pet.weight > 50;
const predicate = R.where({
    category: R.equals('cat'),
    weight: R.gt(R.__, 50),
    weight: R.lt(R.__, 100),
});

const getResults = R.pipe(
    R.filter(predicate),
    R.pluck('name'),
);
const result = getResults(pets); // [ 'Jeans', 'Hoodie', 'Sneakers', 'Doody', 'Bubbles', 'Metal' ]
console.log(result);
