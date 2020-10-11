const R = require('ramda');

const teams = [
    { name: 'Cardinals', score: 5 },
    { name: 'Patriots', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'RedSkins', score: 2 },
];

const sortByScoreDesc = R.sort((a, b) => b.score - a.score);
const getName = R.prop('name');

// getTopName = function (teams) {
//     const sorted = sortByScoreDesc(teams);
//     const topTeam = R.head(sorted);
//     const topName = getName(topTeam);
//     return topName;
// }
getTopName = R.pipe(
    sortByScoreDesc,
    R.head,
    getName,
);

const result = getTopName(teams);
console.log(result);