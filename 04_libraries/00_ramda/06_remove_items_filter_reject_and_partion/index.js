const R = require('ramda');

const pets = [
    { name: 'Spike', type: 'dog' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Rover', type: 'dog' },
    { name: 'Fluffy', type: 'cat' },
    { name: 'Fido', type: 'dog' },
];

const dogCheck = pet => pet.type === 'dog';
// const catCheck = pet => pet.type === 'cat';

const result = R.partition(dogCheck, pets);

console.log(result);