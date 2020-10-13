const R = require('ramda');

const person = {
    firstName: 'Fred',
    lastName: 'Foo',
};

// const fLens = R.lens(R.prop('firstName'), R.assoc('firstName'));
const fLens = R.lensProp('firstName');

// const result = R.view(fLens, person);
// const result = R.set(fLens, 'Wilma', person);
// const firstName = R.view(fLens, person);
// const upperName = R.toUpper(firstName);
// const result = R.set(fLens, upperName, person);
const result = R.over(fLens, R.toUpper, person);

console.log(result);