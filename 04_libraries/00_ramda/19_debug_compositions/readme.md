# Debug Function Compositions Using Tap

```js
const R = require('ramda');
const { identity, compose, fromPairs, map, split, tail } = R;

const queryString = '?page=3&pageSize=30&total=120';

const parseQs = compose(fromPairs, map(split('=')), split('&'), tail);

const result  = parseQs(queryString);
console.log(result);
```

The curren output that we have is:

```js
{ page: '3', pageSize: '30', total: '120' }
```

If we wan to know what is going on, `Ramda` provides a function for this purpose `tap`

```diff
const R = require('ramda');
-const { identity, compose, fromPairs, map, split, tail } = R;
+const { identity, compose, fromPairs, map, split, tail, tap } = R;

const queryString = '?page=3&pageSize=30&total=120';

-const parseQs = compose(fromPairs, map(split('=')), split('&'), tail);
+const parseQs = compose(
+   fromPairs, 
+   map(split('=')), 
+   tap(console.log),
+   split('&'), 
+   tail
+);
+
const result  = parseQs(queryString);
console.log(result);
```

```js
[ 'page=3', 'pageSize=30', 'total=120' ]
{ page: '3', pageSize: '30', total: '120' }
```

We can use it again

```diff
const parseQs = compose(
    fromPairs, 
+   tap(console.log),
    map(split('=')), 
    tap(console.log),
    split('&'), 
    tail
);

```

```js
[ 'page=3', 'pageSize=30', 'total=120' ]
[ [ 'page', '3' ], [ 'pageSize', '30' ], [ 'total', '120' ] ]
{ page: '3', pageSize: '30', total: '120' }
```

We can create a function that take care of logging

```diff
+const log = tap(console.log);
const parseQs = compose(
    fromPairs, 
-   tap(console.log),
+   log,
    map(split('=')), 
-   tap(console.log),
+   log,
    split('&'), 
+   log,
    tail
);

```
