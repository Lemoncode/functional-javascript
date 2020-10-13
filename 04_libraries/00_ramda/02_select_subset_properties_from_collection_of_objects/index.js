const R = require('ramda');
const pets = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Hoodie', price: 60, category: 'cat' },
    { name: 'Jacket', price: 120, category: 'cat' },
    { name: 'JackPot', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Slithery', price: 100, category: 'reptile' },
];

// const getNameAndPrice = R.map(R.pick(['name', 'price']));
const getNameAndPrice = R.project(['name', 'price']);
const result = getNameAndPrice(pets);

console.log(result);