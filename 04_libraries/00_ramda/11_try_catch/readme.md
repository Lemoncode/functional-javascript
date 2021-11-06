# Handle Errors with tryCatch

```js
const R = require('ramda');
const person = {
    name: 'Indiana Jones',
};

const getName = R.prop('name');
const result = getName(person);
console.log(result); // Indiana Jones
```

Let's introduce `pipe` here:

```diff
const R = require('ramda');
const person = {
    name: 'Indiana Jones',
};

const getName = R.prop('name');
+const getUpperName = R.pipe(getName, R.toUpper);
-const result = getName(person);
+const result = getUpperName(person);
console.log(result);

```

We get the name on upper case `INDIANA JONES`. What will happend if we feed an _undefined_ value, we're going to get a type error

```js
const result = getUpperName(undefined);
```

Let's use `tryCatch` to avoid the unhandle exception

```js
const R = require('ramda');
const person = {
    name: 'Indiana Jones',
};

const getUpperName = R.pipe(R.prop('name'), R.toUpper)
const getUpperNameSafe = R.tryCatch(getUpperName, R.always('Default'));

const result = getUpperNameSafe(undefined);
console.log(result);

```

We can use as well `propOr`

```js
const R = require('ramda');
const person = {
    name: 'Indiana Jones',
};

const getName = R.propOr('Default', 'name');
const getUpperName =R.pipe(getName, R.toUpper);
const result = getUpperName(undefined);

console.log(result);

```
