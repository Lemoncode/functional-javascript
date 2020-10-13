const assert = require('assert')
const { dropHighLow } = require('./index');


const input = [1, 2, 3, 4, 5, 6, 7, 8];
const expected = [2, 3, 4, 5, 6, 7];
const result = dropHighLow(input);

assert.deepStrictEqual(result, expected, 'no pass');