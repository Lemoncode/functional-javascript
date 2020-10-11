const R = require('ramda');

const product = {
    name: 'item', 
    price: 10.00, 
    avgRating: 4.5,
    shippingWeight: '2 Kg',
    shippingCost: 2
};

// const getProps = R.omit(['shippingWeight', 'shippingCost']);
const getProps = R.pickBy((val, key) => !R.contains('shipping', key));
const result = getProps(product);
console.log(result);