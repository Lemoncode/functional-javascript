const R = require('ramda');
const { filter, propSatisfies, lte, propEq, allPass } = R;

const cars = [
    {
        name: 'sup',
        doors: 4,
        kpl: 45,
    },
    {
        name: 'T',
        doors: 4,
        kpl: 55,
    },
    {
        name: 'AT',
        doors: 4,
        kpl: 60,
    },
    {
        name: 'sporx',
        doors: 2,
        kpl: 10,
    },
];

const goodPerformance = propSatisfies(lte(50), 'kpl');
const fourDoors = propEq('doors', 4);

const perfectCars = allPass([goodPerformance, fourDoors]);

// const result = filter(fourDoors, cars);
const result = filter(perfectCars, cars);
console.log(result);