## Select a subset of Properties from a Collectionof Objects

```js

```

Now if we want to select just the name of each pet, that's easy to accomplish by

```diff
const R = require('ramda');
const pets = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Hoodie', price: 60, category: 'cat' },
    { name: 'Jacket', price: 120, category: 'cat' },
    { name: 'JackPot', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Slithery', price: 100, category: 'reptile' },
];

-const result = pets;
+const result = pets.map(p => ({ name: p.name}));

console.log(result);

```

Now if we want the price we can do the same and go on, the matter here is that imagine that we have 30 properties inside each object, that is going to get very verbose, very quickly. We can use `pick`

```diff
const R = require('ramda');
const pets = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Hoodie', price: 60, category: 'cat' },
    { name: 'Jacket', price: 120, category: 'cat' },
    { name: 'JackPot', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Slithery', price: 100, category: 'reptile' },
];

-const result = pets.map(p => ({ name: p.name}));
+const result = pets.map(p => R.pick(['name', 'price'], p));

console.log(result);

```

Remember that all Ramdas functions are curryfied, so we can refactor the code above this way:

```diff
const R = require('ramda');
const pets = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Hoodie', price: 60, category: 'cat' },
    { name: 'Jacket', price: 120, category: 'cat' },
    { name: 'JackPot', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Slithery', price: 100, category: 'reptile' },
];

+const getNameAndPrice = R.map(R.pick(['name', 'price']))
-const result = pets.map(p => R.pick(['name', 'price'], p));
+const result = getNameAndPrice(pets);

console.log(result);

```

This is a common patttern, `pick` and `map`, there's a function inside Ramda, that do this

```diff
const R = require('ramda');
const pets = [
    { name: 'Jeans', price: 80, category: 'cat' },
    { name: 'Hoodie', price: 60, category: 'cat' },
    { name: 'Jacket', price: 120, category: 'cat' },
    { name: 'JackPot', price: 35, category: 'dog' },
    { name: 'Bubbles', price: 649, category: 'fish' },
    { name: 'Slithery', price: 100, category: 'reptile' },
];

-const getNameAndPrice = R.map(R.pick(['name', 'price']));
+const getNameAndPrice = R.project(['name', 'price']);
const result = getNameAndPrice(pets);

console.log(result);

```