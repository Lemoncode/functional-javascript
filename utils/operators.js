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

exports.compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

exports.trace = this.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

exports.map = this.curry((f, fn) => fn.map(f));;

exports.split = this.curry((sep, s) => s.split(sep));

exports.match = this.curry((what, s) => s.match(what));

exports.replace = this.curry((what, replacement, s) => s.replace(what, replacement));

exports.filter = this.curry((f, xs) => xs.filter(f));

// exports.intercalate = this.curry((what, xs) => {
//     const partialIntercalated = xs.reduce((acc, el) => `${acc}${what}${el}`);
//     return `${partialIntercalated}${what}`;
// });

exports.intercalate = this.curry((what, xs) => xs.join(what));

exports.toUpperCase = x => x.toUpperCase();

exports.toLowerCase = x => x.toLowerCase();

exports.head = xs => xs[0];

exports.reverse = (xs) => xs.reduce((acc, x) => [x].concat(acc), []);

exports.append = this.curry((what, s) => `${what}${s}`); 

exports.last = xs => xs[xs.length - 1];

exports.prop = this.curry((field, obj) => obj[field]); 

exports.add = this.curry((x, y) => x + y);

exports.concat = this.curry((what, s) => `${what}${s}`);