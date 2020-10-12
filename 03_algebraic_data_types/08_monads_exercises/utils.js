const Maybe = require('./maybe'); 

exports.curry = function curry(fn) {
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
exports.compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// join :: Monad m -> m (m a) -> m a
exports.join = m => m.join();

// map :: Functor f => (a -> b) -> f a -> f b
exports.map = this.curry((fn, f) => f.map(fn));


// chain :: Monad m => (a -> m b) -> m a -> m b
exports.chain = this.curry((f, m) => m.map(f).join());

// safeProp :: Key -> {Key: a} -> Maybe a
exports.safeProp = this.curry((x, obj) => Maybe.of(obj[x]));

// split :: String -> String -> [String]
exports.split = this.curry((sep, str) => str.split(sep));

// last :: [a] -> a
exports.last = xs => xs[xs.length - 1];

exports.trace = this.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

exports.traceIO = this.curry((tag, x) => {
    console.log(tag, x.x.unsafePerformIO());
    return x;
});
