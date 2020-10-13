# Discard High and Low Values From an Array

We start on `index.js`

```js
const R = require('ramda');

module.exports.dropHighLow = function (numbers) {
    // TODO: Make it work
};
```


And with the following test `ìndex.spec.js`

```js
const assert = require('assert')
const { dropHighLow } = require('./index');


const input = [1, 2, 3, 4, 5, 6, 7, 8];
const expected = [2, 3, 4, 5, 6, 7];
const result = dropHighLow(input);

assert.deepStrictEqual(result, expected, 'no pass');
```

Our goal is make this test pass.

We start by using `without`, takes two arguments, an array of values to exclude, and an array to take those values from.

```diff
const R = require('ramda');
+const { without } = R;

module.exports.dropHighLow = function (numbers) {
+  return without([1, 8], numbers);
};
```

Now our test pass. The matter here is that we're harcoding `[1, 8]`, and we need to calculate that in order to make this function generic.

We are going to use more functions from ramda

```js
min(8, 2) // ? 2
max(8, 2) // ? 8
```


Let's create a couple of functions to grab the min and max value from an array of values

```js
const R = require('ramda');
/*diff*/
const { without, min, max, reduce  } = R;
/*diff*/

// ((a, b) → a) → a → [b] → a
// reduce
module.exports.dropHighLow = function (numbers) {
    /*diff*/
    const minFromValues = (values) => reduce(
        min,
        Number.MAX_SAFE_INTEGER,
        values
    );

    const maxFromValues = (values) => reduce(
        max, 
        Number.MIN_SAFE_INTEGER,
        values
    );
    console.log(minFromValues(numbers));
    console.log(maxFromValues(numbers));
    
    /*diff*/
    return without([1, 8], numbers);
};
```

Now we can refactor our function as follows

```diff
module.exports.dropHighLow = function (numbers) {
    const minFromValues = (values) => reduce(
        min,
        Number.MAX_SAFE_INTEGER,
        values
    );

    const maxFromValues = (values) => reduce(
        max,
        Number.MIN_SAFE_INTEGER,
        values
    );
-   console.log(minFromValues(numbers));
-   console.log(maxFromValues(numbers));
-
-   return without([1, 8], numbers);
+   return without([minFromValues(numbers), maxFromValues(numbers)], numbers);
};
```

We can use this in a free style way

```diff
const R = require('ramda');
// const { without } = R;
const { without, min, max, reduce } = R;

// ((a, b) → a) → a → [b] → a
// reduce
module.exports.dropHighLow = function (numbers) {
-   const minFromValues = (values) => reduce(
-       min,
-       Number.MAX_SAFE_INTEGER,
-       values
-   );
+   const minFromValues = reduce(
+       min,
+       Number.MAX_SAFE_INTEGER,
+       numbers
+   );

-   const maxFromValues = (values) => reduce(
-       max,
-       Number.MIN_SAFE_INTEGER,
-       values
-   );
+   const maxFromValues = reduce(
+       max,
+       Number.MIN_SAFE_INTEGER,
+       numbers
+   );

-   return without([minFromValues(numbers), maxFromValues(numbers)], numbers);
+   return without([minFromValues, maxFromValues], numbers);
};
```

Let's refactor this code with more generic functions

```diff
const R = require('ramda');
const { without, min, max, reduce } = R;
+
+const getMinValue = reduce(min, Number.MAX_SAFE_INTEGER);
+const getMaxValue = reduce(max, Number.MIN_SAFE_INTEGER);
+
module.exports.dropHighLow = function (numbers) {
-   const minFromValues = reduce(
-       min,
-       Number.MAX_SAFE_INTEGER,
-       numbers
-   );
+   const minFromValues = getMinValue(numbers);
+
-   const maxFromValues = reduce(
-       max,
-       Number.MIN_SAFE_INTEGER,
-       numbers
-   );
+   const maxFromValues = getMaxValue(numbers)
+
    return without([minFromValues, maxFromValues], numbers);
};
```

We can even go further in our refactor using `converge`

```diff
const R = require('ramda');
-const { without, min, max, reduce } = R;
+const { without, min, max, reduce, converge } = R;

const getMinValue = reduce(min, Number.MAX_VALUE);
const getMaxValue = reduce(max, Number.MIN_VALUE);
+const getExclude = converge((a, b) => [a, b], [getMinValue, getMaxValue]);

module.exports.dropHighLow = function (numbers) {
-   const minFromValues = getMinValue(numbers);
-   const maxFromValues = getMaxValue(numbers);
+   const exclude = getExclude(numbers);
-   return without([minFromValues, maxFromValues], numbers);
+   return without(exclude, numbers);
};
```

For last, we are going to use `identity` to get this one step further

```diff
const R = require('ramda');
-const { without, min, max, reduce, converge } = R;
+const { without, min, max, reduce, converge, identity } = R;

const getMinValue = reduce(min, Number.MAX_VALUE);
const getMaxValue = reduce(max, Number.MIN_VALUE);
const getExclude = converge((a, b) => [a, b], [getMinValue, getMaxValue]);

-module.exports.dropHighLow = function (numbers) {
-    const exclude = getExclude(numbers);
-    return without(exclude, numbers);
-};
+module.exports.dropHighLow = converge(without, [getExclude, identity]);
```