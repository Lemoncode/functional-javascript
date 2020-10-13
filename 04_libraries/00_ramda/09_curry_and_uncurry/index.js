const R = require('ramda');

const add = R.curryN(2, (a, b) => a + b);
const inc = add(1);

// const result = inc(2);

const mult = a => b => a * b;
const multiply = R.uncurryN(2, mult);

const result = multiply(2, 4)
console.log(result);