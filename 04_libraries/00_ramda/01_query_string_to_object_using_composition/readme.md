## Query String to object using commposition

```js
const { identity, compose, fromPairs, map, split, tail } = require('ramda');

const queryString = '?page=2&pageSize=10&total=203';

const parseQs = identity;

const result = parseQs(queryString);
console.log(result); // ?page=2&pageSize=10&total=203

```

What we want to do is get this query string and convert to an object. Instead calling identity we're going to use tail

```diff
const { identity, compose, fromPairs, map, split, tail } = require('rambda');

const queryString = '?page=2&pageSize=10&total=203';

-const parseQs = identity;
+const parseQs = tail;

const result = parseQs(queryString);
console.log(result);

```

This is going to return `page=2&pageSize=10&total=203`, notice that has removed `?`. Now we can go ahead and split from `&`

```diff
const { identity, compose, fromPairs, map, split, tail } = require('rambda');

const queryString = '?page=2&pageSize=10&total=203';

-const parseQs = tail;
+const parseQs = compose(split('&'), tail);

const result = parseQs(queryString);
console.log(result);

```

Now the output that we have is `[ 'page=2', 'pageSize=10', 'total=203' ]`. Let's get this a step further, and make key/value pairs segregated arrays:

```diff
const { identity, compose, fromPairs, map, split, tail } = require('rambda');

const queryString = '?page=2&pageSize=10&total=203';

-const parseQs = compose(split('&'), tail);
+const parseQs = compose(map(split('=')), split('&'), tail);

const result = parseQs(queryString);
console.log(result);

```

Now the output is `[ [ 'page', '2' ], [ 'pageSize', '10' ], [ 'total', '203' ] ]`, Ramda has a function for this `fromPairs`

```js
const { identity, compose, fromPairs, map, split, tail } = require('rambda');

const queryString = '?page=2&pageSize=10&total=203';

const parseQs = compose(fromPairs, map(split('=')), split('&'), tail);

const result = parseQs(queryString);
console.log(result);

```