const R = require('ramda');
const { map } = R;

const nums = [1, 2, 3, 4, 5];
const otherNums = [6, 7, 8, 9, 10];

const double = function(n) {
    return n * 2;
}

// const map = function(fn) {
//     return function (arr) {
//         return arr.map(fn);
//     }
// };

const dblArr = map(double);
const result = dblArr(nums);
const result2 = dblArr(otherNums);

console.log(result);
console.log(result2);