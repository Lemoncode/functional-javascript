const { compose } = require('../../../utils/operators');

class Task {
    constructor(fork) {
        this.fork = fork;
    }

    static rejected(x) {
        return new Task((reject, _) => reject(x))
    }

    static of(x) {
        return new Task((_, resolve) => resolve(x));
    }

    map(fn) {
        return new Task((reject, resolve) => this.fork(reject, compose(resolve, fn)));
    }
}

module.exports = Task;