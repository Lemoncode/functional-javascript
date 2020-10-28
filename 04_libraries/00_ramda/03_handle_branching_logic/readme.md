# Handle Branching Logic

> https://ramdajs.com/docs/#lensProp
> https://ramdajs.com/docs/#over
> https://ramdajs.com/docs/#ifElse

```js
const R = require('ramda');
const products = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Bob', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Freakonomics', price: 30, category: 'reptile' },
];

const pLens = R.lensProp('price');
const applyDiscount = R.curry((perc, amt) => amt - (amt * (perc/100)));

const adjustPrice = R.over(pLens, applyDiscount(50));

const result = R.map(adjustPrice, products);

console.log(result);
```

If we run this

```js
[
  { name: 'Jeans', price: 40, category: 'cat' },
  { name: 'Bob', price: 17.5, category: 'dog' },
  { name: 'Bubbles', price: 324.5, category: 'fish' },
  { name: 'Freakonomics', price: 15, category: 'reptile' }
]
```

Imagine that we want to apply disccount depending on `category`, to do that we're going to use `ifElse`, the first function will be a predicate, depending on its return value, will execute truthy function or falsy function.

```diff
const R = require('ramda');
const products = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Bob', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Freakonomics', price: 30, category: 'reptile' },
];

const pLens = R.lensProp('price');
const applyDiscount = R.curry((perc, amt) => amt - (amt * (perc/100)));

-const adjustPrice = R.over(pLens, applyDiscount(50));
+const adjustPrice = R.ifElse(
+   R.propEq('category', 'cat'),
+   R.over(pLens, applyDiscount(50)),
+   R.over(pLens, applyDiscount(10)),
+);
+
const result = R.map(adjustPrice, products);

console.log(result);
```

And if we run this, we obtain:

```js
[
  { name: 'Jeans', price: 40, category: 'cat' },
  { name: 'Bob', price: 31.5, category: 'dog' },
  { name: 'Bubbles', price: 584.1, category: 'fish' },
  { name: 'Freakonomics', price: 27, category: 'reptile' }
]
```

What if we want to apply just the `cat` discount, a way that we can do this, it's by using `identity`

```diff
const adjustPrice = R.ifElse(
    R.propEq('category', 'cat'),
    R.over(pLens, applyDiscount(50)),
-   R.over(pLens, applyDiscount(10)),
+   R.identity
);
```

Also instead of using `ifElse` we can use `when`

```diff
-const adjustPrice = R.ifElse(
+const adjustPrice = R.when(
    R.propEq('category', 'cat'),
+   R.over(pLens, applyDiscount(50)),
-   R.identity
);
```

We have the symetric operation `unless`

```diff
-const adjustPrice = R.when(
+const adjustPrice = R.unless(
    R.propEq('category', 'cat'),
    R.over(pLens, applyDiscount(50)),
);

```

Now the discount it's applied to the other categories

```js
[
  { name: 'Jeans', price: 80, category: 'cat' },
  { name: 'Bob', price: 17.5, category: 'dog' },
  { name: 'Bubbles', price: 324.5, category: 'fish' },
  { name: 'Freakonomics', price: 15, category: 'reptile' }
]
```

Now imagine that we want to apply the 50 to `cat`, a 10 to `fish`, and live the rest. We can use `cond` for that:

```diff
const R = require('ramda');
...

-const adjustPrice = R.unless(
-    R.propEq('category', 'cat'),
-    R.over(pLens, applyDiscount(50)),
-);
+
+const adjustPrice = R.cond([
+    [R.propEq('category', 'cat'), R.over(pLens, applyDiscount(50))],
+    [R.propEq('category', 'fish'), R.over(pLens, applyDiscount(10))],
+]);

```

If we run this now, we obtain

```js
[
  { name: 'Jeans', price: 40, category: 'cat' },
  undefined,
  { name: 'Bubbles', price: 584.1, category: 'fish' },
  undefined
]
```

The _undefined_ values it's because we don't have a case that matches.

```diff
const adjustPrice = R.cond([
    [R.propEq('category', 'cat'), R.over(pLens, applyDiscount(50))],
    [R.propEq('category', 'fish'), R.over(pLens, applyDiscount(10))],
+   [R.T, R.identity]
]);

```

* R.T returns true
* R.identity returns the given value

