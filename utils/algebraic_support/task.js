const { compose } = require('../operators');

const identity = x => x;
// NOTE: Resume version. Extend the implementation
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

    // ----- Applicative (Task a)
    ap(f) {
        return this.chain(fn => f.map(fn));
    }

    // ----- Monad (Task a)
    chain(fn) {
        return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
    }

    join() {
        return this.chain(identity);
    }
}

module.exports = Task;