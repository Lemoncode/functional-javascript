# Filter an Array Based on Multiple Predicates

```js
const R = require('ramda');
const { filter, propSatisfies, lte, propEq, allPass } = R;

const cars = [
    {
        name: 'sup',
        doors: 4,
        kpl: 45,
    },
    {
        name: 'T',
        doors: 4,
        kpl: 55,
    },
    {
        name: 'AT',
        doors: 4,
        kpl: 60,
    },
    {
        name: 'sporx',
        doors: 2,
        kpl: 10,
    },
];

const result = filter(() => true, cars);
console.log(result);
```

Here we have an array of cars, an also some imports from Ramda function, the first one that we are going to use is `propSatisfies`, that takes its own predicate

```diff
+const goodPerformance = propSatisfies(lte(50), 'kpl')

-const result = filter(() => true, cars);
+const result = filter(goodPerformance, cars);
console.log(result);
```

Let's also compare by a number

```diff
const goodPerformance = propSatisfies(lte(50), 'kpl');
+const fourDoors = propEq('doors', 4);

-const result = filter(goodPerformance, cars);
+const result = filter(fourDoors, cars);
console.log(result);
```

What we want to do is combine these predicates without writing again, we just want to combine them:

```diff
const R = require('ramda');
const { filter, propSatisfies, lte, propEq, allPass } = R;

const cars = [
    {
        name: 'sup',
        doors: 4,
        kpl: 45,
    },
    {
        name: 'T',
        doors: 4,
        kpl: 55,
    },
    {
        name: 'AT',
        doors: 4,
        kpl: 60,
    },
    {
        name: 'sporx',
        doors: 2,
        kpl: 10,
    },
];

const goodPerformance = propSatisfies(lte(50), 'kpl');
const fourDoors = propEq('doors', 4);

+const perfectCars = allPass([goodPerformance, fourDoors]);

-const result = filter(fourDoors, cars);
+const result = filter(perfectCars, cars);
console.log(result);
```
