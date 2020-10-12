const fs = require('fs');
const { split, head, compose, trace, curry, prop } = require('../../../utils/operators');
const { getJSON } = require('../../../utils/http.service');
const Task = require('./task');

// const readFile = filename => new Task((reject, result) => {
//     fs.readFile(filename, (err, data) => (err ? reject(err) : result(data.toString())));
// });

// readFile('metamorphosis')
//     .map(compose(split('\n'), trace('feed')))
//     .map(head)
//     .fork((err) => console.log(err), (data) => console.log(data));

const $getJSON = curry((url, params) => new Task((reject, result) => {
    getJSON(url, params, result, reject);
}));

const taskTitle = $getJSON('https://jsonplaceholder.typicode.com/posts', { userId: 1 })
    .map(head)
    .map(prop('title'));
    
taskTitle.fork((err) => console.log(err), (data) => console.log(data));

console.log('Hola desde por aquí');

// Task.of(3).map(three => three + 1).fork(console.log, console.log);