# Change Object Properties with Ramda Lenses

> https://ramdajs.com/docs/#lens
> https://ramdajs.com/docs/#assoc
> https://ramdajs.com/docs/#view

```js
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

```

If we apply `lens`

```js
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

/*diff*/
const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));

const result = R.view(fLens, person);

console.log(result);  // Fred
/*diff*/
```

Ok, now we want to change the property that the `lens` are focused on

```diff
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));

-const result = R.view(fLens, person);
+const result = R.set(fLens, 'Wilma', person);

console.log(result);  // { firstName: 'Wilma', lastName: 'Foo' }
```

Let's add a new `console.log` and log our original `person` object

```diff
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));

const result = R.set(fLens, 'Wilma', person);

+console.log(person);
console.log(result);
```

We obtain 

```js
{ firstName: 'Fred', lastName: 'Foo' }
{ firstName: 'Wilma', lastName: 'Foo' }
```

This demonstrate, that all these functions treat the data as `immutable`. 

Ok, now let's operate over our `lens` and make that `firstName` to be upper case

```diff
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));
-const result = R.set(fLens, 'Wilma', person);
+const firstName = R.view(fLens, person);
+const upperName = R.toUpper(firstName);
+const result = R.set(fLens, upperName, person);

-console.log(person);
+console.log(result);
```

The result of this 

```js
{ firstName: 'FRED', lastName: 'Foo' }
```

There's a cleaner way to do this

```diff
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));

-const firstName = R.view(fLens, person);
-const upperName = R.toUpper(firstName);
-const result = R.set(fLens, upperName, person);

+const result = R.over(fLens, R.toUpper, person);

console.log(result);
```

`over` is going to take our lens, and it's going to run a function over the focus of that lens. I'm going to start with my lens, followed by the function that I want to run against the data, and finally, the object that I want to run this on. 

Using `lens` this way (the first is the getter using `prop` and the second is the setter using `assoc`) is a common pattern, there's a function to do it:

```diff
const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo'
};

-const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));
+const fLens = R.lensProp('firstName');

const result = R.over(fLens, R.toUpper, person);

console.log(result);
```
