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

exports.add = this.curry((x, y) => x + y);

exports.map = this.curry((fn, f) => f.map(fn));

exports.head = xs => xs[0];

exports.prop = this.curry((field, obj) => obj[field]);

// append :: String -> String -> String
exports.append = this.curry((s, sub) => `${s}${sub}`);

// prepend :: String -> String -> String
exports.prepend = this.curry((s, sub) => `${sub}${s}`);

exports.trace = this.curry((tag, x) => {
    console.log(tag, x);
    return x;
});