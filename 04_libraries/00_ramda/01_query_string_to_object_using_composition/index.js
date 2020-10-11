const { identity, compose, fromPairs, map, split, tail } = require('ramda');

const queryString = '?page=2&pageSize=10&total=203';

const parseQs = compose(
    fromPairs,
    map(split('=')),
    split('&'), 
    tail
);

const result = parseQs(queryString);
console.log(result); // ?page=2&pageSize=10&total=203