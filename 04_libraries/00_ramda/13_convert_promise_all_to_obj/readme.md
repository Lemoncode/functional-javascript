# Convert a Promise.all result to an Object using zip and zipObj

```js
const R = require('ramda');

const getName = () => Promise.resolve('Alex');
const getHobbies = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(['kayak', 'movies', 'soccer']);
    }, 500);
});

Promise.all([getName(), getHobbies()]).then(console.log);

```

> Continue on: https://egghead.io/lessons/ramda-convert-a-promise-all-result-to-an-object-with-ramda-s-zip-and-zipobj

What we want is to get an object with a property name and its hobbies

```diff
Promise.all([getName(), getHobbies()])
+   .then(res => ({ name: res[0], hobbies: res[1] }))
    .then(console.log);

```

This works but we don't wan to have indexes

```diff
Promise.all([getName(), getHobbies()])
-   .then(res => ({ name: res[0], hobbies: res[1] }))
+   .then(([name, hobbies]) => ({ name, hobbies }))
    .then(console.log);
```

We can take this further with some Ramda functions `zip` and `fromPairs`

```diff
const R = require('ramda');
+
+const { zip, fromPairs } = R;

const getName = () => Promise.resolve('Alex');
const getHobbies = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(['kayak', 'movies', 'soccer']);
    }, 500);
});

Promise.all([getName(), getHobbies()])
-   .then(([name, hobbies]) => ({ name, hobbies }))
+   .then(zip(['name', 'hobbies']))
    .then(console.log);

```

Now the output of this

```js
[ [ 'name', 'Alex' ], [ 'hobbies', [ 'kayak', 'movies', 'soccer' ] ] ]
```

`zip` is creating an array of arrays, an each one is a key/value pair, now we can turn this into an object with `fromPairs`

```diff
Promise.all([getName(), getHobbies()])
    .then(zip(['name', 'hobbies']))
+   .then(fromPairs)
    .then(console.log);
```

Now that we have this we can include `compose`

```diff
const R = require('ramda');

-const { zip, fromPairs } = R;
+const { zip, fromPairs, compose } = R;

const getName = () => Promise.resolve('Alex');
const getHobbies = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(['kayak', 'movies', 'soccer']);
    }, 500);
});

Promise.all([getName(), getHobbies()])
-   .then(zip(['name', 'hobbies']))
-   .then(fromPairs)
+   .then(compose(
+       fromPairs,
+       zip(['name', 'hobbies'])
+   ))
    .then(console.log);

```

This is very common so there is a shortcut for it

```diff
const R = require('ramda');

-const { zip, fromPairs, compose } = R;
+const { zipObj } = R;

const getName = () => Promise.resolve('Alex');
const getHobbies = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(['kayak', 'movies', 'soccer']);
    }, 500);
});

Promise.all([getName(), getHobbies()])
-   .then(compose(
-       fromPairs,
-       zip(['name', 'hobbies'])
-   ))
+   .then(zipObj(['name', 'hobbies']))
+   .then(console.log);

```