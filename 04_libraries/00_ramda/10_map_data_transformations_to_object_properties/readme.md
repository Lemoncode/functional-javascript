# Declaratively Map Data Transformaitons to Object Properties


```js
const R = require('ramda');
const product = {
    name: 'surprise',
    price: 100,
    details: {
        shippingInfo: {
            weight: 7
        }
    }
};

const adjustProduct = p => {
    return R.merge(p, { name: R.toUpper(p.name) });
};

const result = adjustProduct(product);

console.log(result);

```

If we run this we have

```js
{ name: 'SURPRISE', price: 100, details: { shippingInfo: { weight: 7 } } }
```

If we have to do this for a lot of properties will get messy soon, Ramda provides a function to avoid these kind of situations:

```diff
const R = require('ramda');
const product = {
    name: 'surprise',
    price: 100,
    details: {
        shippingInfo: {
            weight: 7
        }
    }
};

-const adjustProduct = p => {
-    return R.merge(p, { name: R.toUpper(p.name) });
-};
+const adjustProduct = R.evolve({
+    name: R.toUpper,
+    price: R.multiply(2)
+});

const result = adjustProduct(product);

console.log(result);

```

We can use it inside nested objects

```diff
const adjustProduct = R.evolve({
    name: R.toUpper,
    price: R.multiply(2),
+   details: {
+       shippingInfo: {
+           weight: R.inc
+       }
+   }
});

```

And returns 

```js
{ name: 'surprise', price: 200, details: { shippingInfo: { weight: 8 } } }
```

> NOTE: `evolve` does not touch the properties that are not specified.

