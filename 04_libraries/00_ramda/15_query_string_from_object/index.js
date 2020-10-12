const R = require('ramda');

const { toPairs, map, join, compose, concat } = R;

const qsObj = {
    page: '2',
    pageSize: '10', 
    total: '203',
};

// const result = '?page=2&pageSize=10&total=203';

// const result = toPairs(qsObj);
// const t = map(join('='), result);
// const s = join('&', t);
// const p = concat('?', s);

const objToQs = compose(
    concat('?'),
    join('&'),
    map(join('=')),
    toPairs,
);

const result = objToQs(qsObj);
console.log(result);


