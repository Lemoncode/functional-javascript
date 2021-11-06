import { compose } from './utils'

export class IO {
    static of(x) {
        return new IO(() => x)
    }

    constructor(fn) {
        this.$value = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.$value));
    }

    inspect() {
        return `IO(${this.$value.toString()})`;
    }

    eval() {
        return `IO(${this.$value()})`;
    }
}