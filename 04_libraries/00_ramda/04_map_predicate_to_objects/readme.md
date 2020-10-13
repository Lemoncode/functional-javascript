# Declaratively Map Predicates to Object Properties

> https://ramdajs.com/docs/#pluck

```js
const R = require('ramda');

const pets = [
    { name: 'Jeans', price: 80, category: 'cat', stock: 100 },
    { name: 'Hoodie', price: 50, category: 'cat', stock: 20 },
    { name: 'Sneakers', price: 120, category: 'cat', stock: 30 },
    { name: 'Doody', price: 35, category: 'dog', stock: 10 },
    { name: 'Bubbles', price: 649, category: 'fish', stock: 5 },
    { name: 'Metal', price: 100, category: 'reptile', stock: 200 },
];

const predicate = R.T;

const getResults = R.pipe(
    R.filter(predicate),
    R.pluck('name'),
);
const result = getResults(pets); // [ 'Jeans', 'Hoodie', 'Sneakers', 'Doody', 'Bubbles', 'Metal' ]
console.log(result);

```

Let's ay we only want to return pets that are on `cat` category

```diff
const R = require('ramda');
...

-const predicate = R.T;
+const predicate = pet => pet.category === 'cat';

const getResults = R.pipe(
    R.filter(predicate),
    R.pluck('name'),
);
const result = getResults(pets); 
console.log(result);
```

Let's get this a little bit further, let's say that I want clothes with weight upper than 50

```diff
-const predicate = pet => pet.category === 'cat';
+const predicate = pet => pet.category === 'cat' && pet.weight > 50;
```

Now let's say that we want to filter by price, we can add a new condition, but this it's going to start to be a mess. We can use instead `where`

```diff
-const predicate = pet => pet.category === 'cat' && pet.weight > 50;
+const predicate = R.where({
+   category: R.equals('cat'),
+   weight: R.lt(R.__, 50),
+});
+
```

The arguments for lessthan come in in a slightly different order than we're used to. I'm going to put a placeholder because I want my incoming data for my property value to go here. My second argument is going to be the value that I'm checking against.

Check any other condition becames trivial

```diff
const predicate = R.where({
    category: R.equals('cat'),
-   weight: R.lt(R.__, 50),
+   weight: R.gt(R.__, 50),
+   weight: R.lt(R.__, 100),
});

```