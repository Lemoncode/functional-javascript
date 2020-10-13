const R = require('ramda');
// const { prop, map, compose, pluck, unnest } = R;
const { prop, compose, pluck, chain, uniq } = R;

const product = {
    name: 'Item',
    sizes: [
        {
            name: 'L',
            colors: [
                { name: 'red' },
                { name: 'pink' },
            ],
        },
        {
            name: 'M',
            colors: [
                { name: 'green' },
                { name: 'red' },
            ],
        },
        {
            name: 'S',
            colors: [
                { name: 'cyan' },
                { name: 'yellow' },
            ],
        },
    ],
};

const getSizes = prop('sizes');
// const getColors = compose(unnest, map(prop('colors')));
const getColors = chain(prop('colors'));
const getColorNames = pluck('name');

const getUniqueColors = compose(
    uniq,
    getColorNames,
    getColors,
    getSizes,
);

// const result = colorNames;
const result = getUniqueColors(product);
console.log(result);

