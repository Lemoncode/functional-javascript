const R = require('ramda');
const person = {
    name: 'Indiana Jones',
};

const getName = R.propOr('Default','name');
const getUpperName = R.pipe(getName, R.toUpper);
// const getUpperNameSafe = R.tryCatch(getUpperName, R.always('Default'));
const result = getUpperName(undefined);
console.log(result); // Indiana Jones