# Get a List of Unique Values From Nested Arrays

```js
const R = require('ramda');
const { prop, map, compose } = R;

const product = {
    name: 'Item',
    sizes: [
        {
            name: 'L',
            colors: [
                { name: 'red' },
                { name: 'pink' },
            ],
        },
        {
            name: 'M',
            colors: [
                { name: 'green' },
                { name: 'red' },
            ],
        },
        {
            name: 'S',
            colors: [
                { name: 'cyan' },
                { name: 'yellow' },
            ],
        },
    ],
};

const getSizes = prop('sizes');
const sizes = getSizes(product);

const result = sizes;
console.log(result);
```

Our goal is to get a unique list of color values that are available for this product independent of what size each color belongs to.

Let's start by grabing the the colors from sizes

```diff
const R = require('ramda');
const { prop, map, compose } = R;

...

const getSizes = prop('sizes');
const sizes = getSizes(product);
+
+const getColors = map(prop('colors'));
+const colors = getColors(sizes);
+
-const result = sizes;
+const result = colors;
console.log(result);


```

The output of this is an array of arrays

```js
[
  [ { name: 'red' }, { name: 'pink' } ],
  [ { name: 'green' }, { name: 'red' } ],
  [ { name: 'cyan' }, { name: 'yellow' } ]
]
```

All we need is the colors name:

```diff
const R = require('ramda');
-const { prop, map, compose } = R;
+const { prop, map, compose, pluck } = R;
...

const getSizes = prop('sizes');
const sizes = getSizes(product);

const getColors = map(prop('colors'));
const colors = getColors(sizes);
+
+const getColorNames = map(pluck('name'))
+const colorNames = getColorNames(colors);
+
-const result = colors;
+const result = colorNames;
console.log(result);
```

The output now is nested arrays but just the names

```js
[ [ 'red', 'pink' ], [ 'green', 'red' ], [ 'cyan', 'yellow' ] ]
```

If we have a look on what we got currently we can find out that is a perfect candaidate for composition

```diff
const getSizes = prop('sizes');
-const sizes = getSizes(product);

const getColors = map(prop('colors'));
-const colors = getColors(sizes);

const getColorNames = map(pluck('name'))
-const colorNames = getColorNames(colors);
+
+const getUniqueColors = compose(
+   getColorNames,
+   getColors,
+   getSizes,
+);
+
-const result = colorNames;
+const result = getUniqueColors(product);
console.log(result);
```

Now we have to deal with the nested arrays, the `killer` _getColors_, then we have to  map again over pluck to ride off the value. Ramda has a function `unnest`

```diff
const R = require('ramda');
-const { prop, map, compose, pluck } = R;
+const { prop, map, compose, pluck, unnest } = R;
...

const getSizes = prop('sizes');
-const getColors = map(prop('colors'));
+const getColors = compose(unnest, map(prop('colors')));
-const getColorNames = map(pluck('name'))
+const getColorNames = pluck('name');

const getUniqueColors = compose(
    getColorNames,
    getColors,
    getSizes,
);
```

Another way to handle this is use `chain`, is essentally a `flatMap`

```diff
const R = require('ramda');
-const { prop, map, compose, pluck, unnest } = R;
+const { prop, map, compose, pluck, chain } = R;
...

const getSizes = prop('sizes');
-const getColors = compose(unnest, map(prop('colors')));
+const getColors = chain(prop('colors'));
const getColorNames = pluck('name');

const getUniqueColors = compose(
    getColorNames,
    getColors,
    getSizes,
);

const result = getUniqueColors(product);
console.log(result);

```

The last step is to get off the repeated values, we can do it with `uniq`

```diff
-const { prop, compose, pluck, chain } = R;
+const { prop, compose, pluck, chain, uniq } = R;
....
const getUniqueColors = compose(
+   uniq,
    getColorNames,
    getColors,
    getSizes,
);
```