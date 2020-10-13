# Create a Query String from an Object

```js
const R = require('ramda');

const { toPairs, map, join, compose, concat } = R;

const qsObj = {
    page: '2',
    pageSize: '10', 
    total: '203',
};

const result = '?page=2&pageSize=10&total=203';
console.log(result);

```

## Exercise

Create a function that takes `qsObj` and returns `?page=2&pageSize=10&total=203`, the solution must use free point style.

## Solution

First we can achive this without free pint style

```js
const R = require('ramda');

const { toPairs, map, join, compose, concat } = R;

const qsObj = {
    page: '2',
    pageSize: '10', 
    total: '203',
};

// const result = '?page=2&pageSize=10&total=203';
/*diff*/
const result = toPairs(qsObj);
const t = map(join('='), result);
const s = join('&', t);
const p = concat('?', s);

console.log(p);
/*diff*/
```

Now we are ready to use `compose`

```js
const R = require('ramda');

const { toPairs, map, join, compose, concat } = R;

const qsObj = {
    page: '2',
    pageSize: '10', 
    total: '203',
};
const objToQs = compose(
    concat('?'),
    join('&'),
    map(join('=')),
    toPairs,
);

const result = objToQs(qsObj);
console.log(result);

```