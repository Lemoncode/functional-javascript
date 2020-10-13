## Pointfree compose and converge

```js
const R = require('ramda');

const pet = {
    id: 1,
    name: 'Fluffy',
};

const generateUrl = (id) => `https://homelesspet/photo/${id}.png`;
const getUpdatedPet = (pet) => {
    const url = generateUrl(pet.id); // [1]
    return R.assoc('photo', url, pet); // [2]
};

const result = getUpdatedPet(pet);
console.log(result);
```

1. This function generates a new url
2. Creates a new object with a new property `photo`

What will happen if `pet.id` is not define, we can avoid this issue with `Ramda`

```diff
const getUpdatedPet = (pet) => {
-   const url = generateUrl(pet.id);
+   const url = generateUrl(R.propOr('default', 'id')(pet));
    return R.assoc('photo', url, pet); 
};
```

This is not bad, but we cna improve this using `compose`

```diff
const getUpdatedPet = (pet) => {
-   const url = generateUrl(R.propOr('default', 'id')(pet));
+   const url = R.compose(
+       generateUrl,
+       R.propOr('default', 'id'),
+   );
+
-   return R.assoc('photo', url, pet); 
+   return R.assoc('photo', url(pet), pet);
};
```

Now let's flat this a little bit by refactoring:

```diff
const generateUrl = (id) => `https://homelesspet/photo/${id}.png`;
+const getUrlFromPet = R.compose(generateUrl,R.propOr('default', 'id'));
const getUpdatedPet = (pet) => {
-   const url = generateUrl(R.propOr('default', 'id')(pet));
-   const url = R.compose(
-       generateUrl,
-       R.propOr('default', 'id'),
-   );
-
-   return R.assoc('photo', url(pet), pet);
+   return R.assoc('photo', getUrlFromPet(pet), pet);
};
```

And go a little bit further by converting to a lamdda

```js
const R = require('ramda');

const pet = {
    id: 1,
    name: 'Fluffy',
};

const generateUrl = (id) => `https://homelesspet/photo/${id}.png`;
const getUrlFromPet = R.compose(generateUrl,R.propOr('default', 'id'));
const getUpdatedPet = (pet) => R.assoc('photo', getUrlFromPet(pet), pet);

const result = getUpdatedPet(pet);
console.log(result);
```

The issue here is that we have this nested function, and we're feeding `pet twice`, let's use `converge` to avoid this:

```js
const R = require('ramda');

const pet = {
    id: 1,
    name: 'Fluffy',
};

const generateUrl = (id) => `https://homelesspet/photo/${id}.png`;
const getUrlFromPet = R.compose(generateUrl,R.propOr('default', 'id'));
// const getUpdatedPet = (pet) => R.assoc('photo', getUrlFromPet(pet), pet);
const getUpdatedPet = R.converge(R.assoc('photo'), [getUrlFromPet, R.identity]);

const result = getUpdatedPet(pet);
console.log(result);
```

The second argument for `converge` is going to be an array of transformation functions. I'm going to wrap get URL from pets square brackets. I'm going to get rid of these references to pet.

What's going to happen is our pet argument's going to be passed in. It's going to be passed to each transformation function which is going to give us an array of results and that array is then going to be passed in as arguments to this first function here.

What we need is get URL from pet which is going to take a pet, it'll get the ID, generate a URL. It'll pass that in as the second argument here.

Then, we need one more transformation that's going to take pet and basically just pass it along as is. For that, we can use Ramda's identity function that'll take whatever argument gets passed in and just return it.