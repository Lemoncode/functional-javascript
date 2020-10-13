const R = require('ramda');
const products = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Bob', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Freakonomics', price: 30, category: 'reptile' },
];

const pLens = R.lensProp('price');
const applyDiscount = R.curry((perc, amt) => amt - (amt * (perc/100)));

// const adjustPrice = R.unless(
//     R.propEq('category', 'cat'),
//     R.over(pLens, applyDiscount(50)),
// );

const adjustPrice = R.cond([
    [R.propEq('category', 'cat'), R.over(pLens, applyDiscount(50))],
    [R.propEq('category', 'fish'), R.over(pLens, applyDiscount(10))],
    [R.T, R.identity]
]);

const result = R.map(adjustPrice, products);

console.log(result);