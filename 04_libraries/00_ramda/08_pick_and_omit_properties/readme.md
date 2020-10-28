# Pick and Omit Properties from Objects

```js
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

const result = '';
console.log(result);
```

Let's say that result became a new object but just with the name and price properies

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

-const result = '';
+const result = R.pick(['name', 'price'], product);
console.log(result);
```

We get:

```js
{ name: 'item', price: 10.00 }
```

We can use the curry to make a generic function over this

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

+const getProps = R.pick(['name', 'price'])
-const result = R.pick(['name', 'price'], product);
+const result = getProps(product);
console.log(result);
```

Let's try to get a property that does not exist on the product:

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

-const getProps = R.pick(['name', 'price']);
+const getProps = R.pick(['name', 'price', 'category']);
const result = getProps(product);
console.log(result);
```

The result is that this property is not populated since does not exist on my current product:

```js
{ name: 'item', price: 10.00 }
```

Let's say that we want that category is always present

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

-const getProps = R.pick(['name', 'price', 'category']);
+const getProps = R.pickAll(['name', 'price', 'category']);
const result = getProps(product);
console.log(result);
```

The output will be

```js
{ name: 'item', price: 10.00, category: undefined 
```

Let's say that we want to get the values in a programmatic way, we can use `pickBy`

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    shippingWeight: '2 Kg'
};

-const getProps = R.pickAll(['name', 'price', 'category']);
+const getProps = R.pickBy(val => Number(val));
const result = getProps(product);
console.log(result);
```

The output will be

```js
{ price: 10.00 }
```

If we edit the object and add a new numeric proeperty, that proeperty will be populated as well

```diff
const product = {
    name: 'item', 
    price: 10.00, 
+   avgRating: 4.5,
    shippingWeight: '2 Kg'
};
```

We can get it further, by using nested Ramda functions inside `pickBy`

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    avgRating: 4.5,
    shippingWeight: '2 Kg'
};

-const getProps = R.pickBy(val => Number(val));
+const getProps = R.pickBy((val, key) => R.includes('shipping', key));
const result = getProps(product);
console.log(result);
```

```js
{ shippingWeight: '2 Kg' }
```
If we add a new property that contains `shipping` that will be returned as well.

```diff
const product = {
    name: 'item', 
    price: 10, 
    avgRating: 4.5,
    shippingWeight: '2 Kg',
+   shippingCost: 2
};
```

Some times instead include properties we want to exclude

```diff
const R = require('ramda');

const product = {
    name: 'item', 
    price: 10, 
    avgRating: 4.5,
    shippingWeight: '2 Kg',
    shippingCost: 2
};

-const getProps = R.pickBy((val, key) => R.contains('shipping', key));
+const getProps = R.omit(['shippingWeight', 'shippingCost']);
const result = getProps(product);
console.log(result);
```

And the output

```js
{ name: 'item', price: 10, avgRating: 4.5 }
```
There's no `omitBy`, but is easily doable, by using `pickBy`

```js
const getProps = R.pickBy((val, key) => !R.contains('shipping', key));
```