const R = require('ramda');
const product = {
    name: 'surprise',
    price: 100,
    details: {
        shippingInfo: {
            weight: 7
        }
    }
};

const adjustProduct = R.evolve({
    name: R.toUpper,
    price: R.multiply(2),
    details: {
        shippingInfo: {
            weight: R.inc
        }
    }
});

const result = adjustProduct(product);

console.log(result);