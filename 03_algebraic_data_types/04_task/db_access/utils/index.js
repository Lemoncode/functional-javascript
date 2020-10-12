const { inspect } = require('util');

module.exports.curry = function curry(fn) {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    };
}

// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduceRight
module.exports.compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

module.exports.map = this.curry((fn, f) => f.map(fn));

// match :: Regex -> String -> [String]
module.exports.match = this.curry((reg, s) => s.match(reg));

module.exports.head = xs => xs[0];

// replace :: RegExp -> String -> String -> String
exports.replace = this.curry((re, rpl, str) => str.replace(re, rpl));

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${inspect(this.$value, false, 1, true)})`;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${inspect(this.$value)})`;
    }
}

const _compose = this.compose;

// TODO: Add Task
class Task {
    constructor(fork) {
        this.fork = fork;
    }

    static rejected(x) {
        return new Task((reject, _) => reject(x));
    }

    static of(x) {
        return new Task((_, resolve) => resolve(x));
    }

    map(fn) {
        return new Task((reject, resolve) => this.fork(reject, _compose(resolve, fn)));
    }
}

class IO {
    constructor(fn) {
        this.unsafePerformIO = fn;
    }

    inspect() {
        return 'IO(?)';
    }

    // ----- Pointed IO
    static of(x) {
        return new IO(() => x);
    }

    // ----- Functor IO
    map(fn) {
        return new IO(_compose(fn, this.unsafePerformIO));
    }
}

module.exports.Either = Either;
module.exports.Right = Right;
module.exports.Left = Left;
module.exports.left = x => new Left(x);
module.exports.Task = Task;
module.exports.IO = IO;

// either :: (a -> c) -> (b -> c) -> Either a b -> c
module.exports.either = this.curry((f, g, e) => {
    let result;
    switch (e.constructor.name) {
        case 'Left':
            result = f(e.$value);
            break;
        case 'Right':
            result = g(e.$value);
            break;
    }

    return result;
});
