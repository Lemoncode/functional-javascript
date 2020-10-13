const R = require('ramda');
const { without, min, max, reduce, converge, identity } = R;

const getMinValue = reduce(min, Number.MAX_VALUE);
const getMaxValue = reduce(max, Number.MIN_VALUE);
const getExclude = converge((a, b) => [a, b], [getMinValue, getMaxValue]);
module.exports.dropHighLow = converge(without, [getExclude, identity]);