# Create an Array from Seed Value with Unfold

```js
const R = require('ramda');
const { unfold, curry } = R;

const result = undefined;
console.log(result);

```

`unfold` is going to take two arguments, a _function_ and a seed value. When the function evaluates to false, unfold will stop.

```js
const R = require('ramda');
const { unfold, curry } = R;

const toTwenty = n => n > 20 ? false : [n, n + 1];
const result = unfold(toTwenty, 1);
console.log(result);

```

Now if we run this:

```js
[
   1,  2,  3,  4,  5,  6,  7,
   8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20
]
```

Let's make it more flexible

```diff
const R = require('ramda');
const { unfold, curry } = R;

-const toTwenty = n => n > 20 ? false : [n, n + 1];
+const throughNByOne = curry((limit, n) => n > limit ? false : [n, n + 1]);
-const result = unfold(toTwenty, 1);
+const result = unfold(throughNByOne(15), 1);
console.log(result);

```

## Exercise

Create and array that calculates the bits for a given entry on KBs.

```js
const R = require('ramda');

const { unfold, curry } = R;

const KBToBits = curry(
    (kbs, n) => n > kbs ? false : [Math.pow(2, n), n + 1]
);

const result = unfold(KBToBits(10), 1);

console.log(result);
```