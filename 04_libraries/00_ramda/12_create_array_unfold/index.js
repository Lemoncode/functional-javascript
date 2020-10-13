const R = require('ramda');

const { unfold, curry } = R;

const KBToBits = curry(
    (kbs, n) => n > kbs ? false : [Math.pow(2, n), n + 1]
);

const result = unfold(KBToBits(10), 1);

console.log(result);