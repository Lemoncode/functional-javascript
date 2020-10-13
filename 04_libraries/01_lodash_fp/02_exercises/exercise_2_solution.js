const fp = require('lodash/fp');

const students = [
    { name: "John", grades: [7.0, 6.9, 8.0], group: "A" },
    { name: "Paul", grades: [5.0, 8.7, 3.7], group: "A" },
    { name: "Alex", grades: [5.0, 4.7, 3.7], group: "A" },
    { name: "Luke", grades: [9.0, 8.2, 6.2], group: "B" },
    { name: "Mark", grades: [6.0, 9.0, 8.4], group: "B" },
    { name: "Alice", grades: [3, 4.7, 4.5], group: "B" },
    { name: "Harvey", grades: [1.5, 6.6, 3], group: "C" },
    { name: "Nina", grades: [6.9, 4.4, 7], group: "C" },
    { name: "Evan", grades: [1.2, 6.8, 1.7], group: "C" },
];

const isApproved = fp.flow(
    fp.mean,
    fp.gte(fp.__, 5),
);

const getApprovedStudentsNameByClass = fp.flow(
    fp.filter(fp.conformsTo({ grades: isApproved })),
    fp.groupBy('group'),
    fp.mapValues(fp.map('name')),
);

const result = getApprovedStudentsNameByClass(students);
console.log(result);