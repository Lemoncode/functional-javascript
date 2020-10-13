# Add and Remove Items in Arrays using Filter, Reject and Partion

```js
const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];
```

Let's filter and grab just the dogs

```js
const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];

/*diff*/
const dogCheck = pet => pet.type == 'dog';

const result = R.filter(dogCheck, pets);

console.log(result);
/*diff*/
```

This will return 

```js
[
  { name: 'Spike', type: 'dog' },
  { name: 'Rover', type: 'dog' },
  { name: 'Fido', type: 'dog' }
]
```

Le's say that now we want the cats


```diff
const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];


const dogCheck = pet => pet.type == 'dog';
const catCheck = pet => pet.type == 'cat';

-const result = R.filter(dogCheck, pets);
+const result = R.filter(catCheck, pets);

console.log(result);
```

With Ramda, we can handle this on a different way:

```js
const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];

/*diff*/
const dogCheck = pet => pet.type == 'dog';
const result = R.reject(dogCheck, pets);
/*diff*/

console.log(result);
```

Now let's say that we want both the _cats_ and the _dogs_, but in separate predicates

```diff
const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];


const dogCheck = pet => pet.type == 'dog';

-const result = R.reject(dogCheck, pets);
+const result = R.partition(dogCheck, pets);

console.log(result);
```

When we run this, we obtain

```js
[
  [
    { name: 'Spike', type: 'dog' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fido', type: 'dog' }
  ],
  [ { name: 'Mittens', type: 'cat' }, { name: 'Fluffy', type: 'cat' } ]
]
```