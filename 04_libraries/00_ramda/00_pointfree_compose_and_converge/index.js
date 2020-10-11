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