# Create a Reusable Mapping Function

```js
const R = require('ramda');

const nums = [1, 2, 3, 4, 5];

const result = nums.map(function(n) {
    return n * 2;
});

console.log(result);
```

Let's say that we have another array and I want to make the same, a simple way to do it will be copy/paste.

```diff
const nums = [1, 2, 3, 4, 5];
+const otherNums = [6, 7, 8, 9, 10];

const result = nums.map(function(n) {
    return n * 2;
});
+
+const result2 = otherNums.map(function(n) {
+   return n * 2;
+});
+
console.log(result);
+console.log(result2);
```
Obviously there's a lot of duplicity here, so let's take it out

```js
const nums = [1, 2, 3, 4, 5];
const otherNums = [6, 7, 8, 9, 10];

const double = function(n) {
    return n * 2;
}

const result = nums.map(double);
const result2 = otherNums.map(double);

console.log(result);
console.log(result2);
```

What we want to do is have a reusable map

```diff
const R = require('ramda');

const nums = [1, 2, 3, 4, 5];
const otherNums = [6, 7, 8, 9, 10];

const double = function(n) {
    return n * 2;
}

const map = function(fn, arr) {
    return arr.map(fn);
};

-const result = nums.map(double);
+const result = map(double, nums);
-const result2 = otherNums.map(double);
+const result2 = map(double, otherNums);

console.log(result);
console.log(result2);
```

Let's give some more power to our map function:

```js
const R = require('ramda');

const nums = [1, 2, 3, 4, 5];
const otherNums = [6, 7, 8, 9, 10];

const double = function(n) {
    return n * 2;
}

// const map = function(fn, arr) {
//     return arr.map(fn);
// };
/*diff*/
const map = function(fn) {
    return function (arr) {
        return arr.map(fn);
    }
};
/*diff*/
const result = map(double, nums);
const result2 = map(double, otherNums);

console.log(result);
console.log(result2);
```

```diff
+const dblArr = map(double);
+
-const result = map(double, nums);
+const result = dblArr(nums);
-const result2 = map(double, otherNums);
+const result2 = dblArr(otherNums);
+
```

Now instead using our map function we can use the Ramda one

```diff
const R = require('ramda');
+const { map } = R;

const nums = [1, 2, 3, 4, 5];
const otherNums = [6, 7, 8, 9, 10];

const double = function(n) {
    return n * 2;
}

-const map = function(fn) {
-    return function (arr) {
-        return arr.map(fn);
-    }
-};
+
+const dblArr = map(double);
+const result = dblArr(nums);
+const result2 = dblArr(otherNums);
+
console.log(result);
console.log(result2);
```