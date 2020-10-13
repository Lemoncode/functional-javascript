# Sort an Array of Objects by Multiple Fields


```js
const R = require('ramda');

const { prop, sort, sortWith, ascend, descend } = R;

const sample = [
    { name: 'jai', age: 3, height: 0.45 },
    { name: 'lau', age: 8, height: 1.35 },
    { name: 'ana', age: 41, height: 1.67 },
    { name: 'txape', age: 68, height: 1.75 },
    { name: 'bert', age: 68, height: 1.55 },
    { name: 'borj', age: 41, height: 1.73 },
];

const result = sample;
console.log(result);

```

Here we start with an array of objects with some properties.

## Exercise

### 1. Sort each person by age 

```diff
-const result = sample;
+const result = sort(ascend(prop('age')), sample);
```

### 2. In the cases where age match, also sort by height in descending order

```diff
-const result =  sort(ascend(prop('age')), sample); // sample;
+const result = sortWith([
+   ascend(prop('age')),
+   descend(prop('height'))
+], sample);
+
```