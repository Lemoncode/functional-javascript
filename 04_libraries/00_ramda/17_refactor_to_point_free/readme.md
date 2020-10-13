# Refactor to Point Free

> Reference: https://emojipedia.org/flags/

```js
const R = require('ramda');

const {find, propEq} = R;

const countries = [
    { cc: 'GU', flag: '🇬🇾' },
    { cc: 'MT', flag: '🇲🇶' },
    { cc: 'SG', flag: '🇸🇳' },
    { cc: 'PG', flag: '🇵🇹' },
];

const getCountry = () => {};

const result = getCountry('GU', countries);
console.log(result);
```

## Exercise

### 1. Return a country by cc

```diff
-const getCountry = () => {};
+const getCountry = (cc, list) => find(propEq('cc', cc), list);

```

### 2. Make the previous function point free

```diff
-const getCountry = (cc, list) => find(propEq('cc', cc), list);
+const getCountry = useWith(find, [propEq('cc'), identity]) // propEq('cc', cc), list);
```

NOTE: Each parameter is feed it into array functions

'GU' -> propEq('cc')
countries -> identity