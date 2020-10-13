const R = require('ramda');
// const { identity, compose, fromPairs, map, split, tail } = R;
const { identity, compose, fromPairs, map, split, tail, tap } = R;

const queryString = '?page=3&pageSize=30&total=120';

// const parseQs = compose(fromPairs, map(split('=')), split('&'), tail);
const log = tap(console.log);
const parseQs = compose(
    fromPairs, 
    // tap(console.log),
    log,
    map(split('=')), 
    // tap(console.log),
    log,
    split('&'), 
    log,
    tail
);

const result  = parseQs(queryString);
console.log(result);