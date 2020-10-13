# Curry and Uncurry Functions

```js
const R = require('ramda');

const add = (a, b) => a + b;

const result = add(1, 2);
console.log(result);
```

Let's curryfy this function

```diff
const R = require('ramda');

-const add = (a, b) => a + b;
+const add = a => b => a + b;
+const inc = add(1);

-const result = add(1, 2);
+const result = inc(2);
console.log(result);
```

The matter now is that I always have to call `add` in two seperate functions. To avoid this kind of situation we can use `curry`.

```diff
const R = require('ramda');

-const add = a => b => a + b;
+const add = R.curry((a, b) => a + b);
const inc = add(1);

const result = inc(2);
console.log(result);
```

There's another version called `curryN` that allows write the arity of the function

```js
const add = R.curryN(2, (a, b) => a + b);
```

Now let's say that we import a funtion that returns another function

```js
const mult = a => b => a * b;
```

So here is not an option to use `curry`, what we can do:

```js
const R = require('ramda');

const mult = a => b => a * b;
const multiply = R.uncurryN(2, mult);

const result = multiply(2, 4);
console.log(result);
```