const fs = require('fs');
const { Task } = require('./utils');

module.exports.readFile = (filename) => new Task((reject, result) => {
    fs.readFile(filename, (err, data) => (err ? reject(err) : result(data)));
});