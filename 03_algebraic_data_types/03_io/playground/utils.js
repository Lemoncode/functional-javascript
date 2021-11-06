export const curry = function curry(fn) {
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
export const compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

exports.trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
});

// head :: [a] -> a
export const head = xs => xs[0];

// prop :: String -> Object -> a
export const prop = curry((p, obj) => obj[p]);


// map :: Functor f => (a -> b) -> f a -> f b
export const map = curry((fn, f) => f.map(fn));

// split :: String -> String -> [String]
export const split = curry((sep, str) => str.split(sep));

// eq :: Eq a => a -> a -> Boolean
export const eq = curry((a, b) => a === b);

// find :: (a -> a) -> [a] -> a
export const find = curry((f, xs) => xs.find(f));

// last :: [a] -> a
export const last = xs => xs[xs.length - 1];