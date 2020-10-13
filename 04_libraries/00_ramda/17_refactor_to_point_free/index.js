const R = require('ramda');

const {find, propEq, useWith, identity} = R;

const countries = [
    { cc: 'GU', flag: '🇬🇾' },
    { cc: 'MT', flag: '🇲🇶' },
    { cc: 'SG', flag: '🇸🇳' },
    { cc: 'PG', flag: '🇵🇹' },
];

// const getCountry = () => {};
// const getCountry = (cc, list) => find(propEq('cc', cc), list);
const getCountry = useWith(find, [propEq('cc'), identity]) // propEq('cc', cc), list);

const result = getCountry('GU', countries);
console.log(result);