# Build a Functional Pipeline

```js
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];

```

We want to create a function that will take the top scoring tema  and return only the name.

```js
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];

/*diff*/
const getTopName = function (teams) {

}

const result = getTopName(teams);
console.log(result);
/*diff*/
```

So let's start by having the teams sorted

```diff
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];


const getTopName = function (teams) {
+   const sorted = R.sort((a, b) => b.score - a.score, teams);
+   return sorted;
}

const result = getTopName(teams);
console.log(result);
```

This will return 

```js
[
  { name: 'Bears', score: 6 },
  { name: 'Cardinals', score: 5 },
  { name: 'Patriots', score: 4 },
  { name: 'RedSkins', score: 2 }
]
```

Now we just need to grab the top team

```diff
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];


const getTopName = function (teams) {
    const sorted = R.sort((a, b) => b.score - a.score, teams);
+   const topTeam = R.head(sorted)
-   return sorted;
+   return topTeam;
}

const result = getTopName(teams);
console.log(result);
```

Now we need just to grab the name property, we can do this by:

```diff
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];


const getTopName = function (teams) {
    const sorted = R.sort((a, b) => b.score - a.score, teams);
    const topTeam = R.head(sorted)
+   const topName = R.prop('name', topTeam);
-   return topTeam;
+   return topName;
}

const result = getTopName(teams);
console.log(result);
```

Ok, because every Ramda funtion is curryfied, we can refactor this as follows:

```diff
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];

+const sortByScoreDesc = R.sort((a, b) => b.score - a.score);
+const getName = R.prop('name');

const getTopName = function (teams) {
-   const sorted = R.sort((a, b) => b.score - a.score, teams);
+   const sorted = sortByScoreDesc(teams);
    const topTeam = R.head(sorted);
-   const topName = R.prop('name', topTeam);
+   const topName = getName(topTeam);
    return topName;
}

const result = getTopName(teams);
console.log(result);
```

We can notice that we are jsut passing the data to each function, just after its evaluation, so we can apply:

```diff
const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];

const sortByScoreDesc = R.sort((a, b) => b.score - a.score);
const getName = R.prop('name');

-const getTopName = function (teams) {
-    const sorted = sortByScoreDesc(teams);
-    const topTeam = R.head(sorted);
-    const topName = getName(topTeam);
-    return topName;
-}
+const getTopName = R.pipe(
+    sortByScoreDesc,
+    R.head,
+    getName,
+);
+
const result = getTopName(teams);
console.log(result);
```