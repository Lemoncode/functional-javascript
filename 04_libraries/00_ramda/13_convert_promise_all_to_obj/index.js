const R = require('ramda');

// const { zip, fromPairs } = R;
const { zipObj } = R;

const getName = () => Promise.resolve('Alex');
const getHobbies = () => new Promise((res, rej) => {
    setTimeout(() => {
        res(['kayak', 'movies', 'soccer']);
    }, 500);
});

Promise.all([getName(), getHobbies()])
    .then(zipObj(['name', 'hobbies']))
    .then(console.log);
