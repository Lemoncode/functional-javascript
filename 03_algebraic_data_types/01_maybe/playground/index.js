const { match, prop, add, map, compose, curry } = require('../../../utils/operators');

class Maybe {
    static of(x) {
        return new Maybe(x);
    }

    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }

    constructor(x) {
        this.$value = x;
    }

    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }

    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
    }
}

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
    if (m.isNothing) {
        return v;
    }

    return f(m.$value);
});

// const x = Maybe.of('patata patata').map(match(/a/ig));
// const y = Maybe.of(null).map(match(/a/ig));
// const z = Maybe.of({ name: 'Jacob' }).map(prop('age')).map(add(10));
// const w = Maybe.of({ name: 'Lua' , age: 8}).map(prop('age')).map(add(10));

// console.log(x, y, z, w);

// const safeHead = xs => Maybe.of(xs[0]);

// const streetName = compose(
//     map(prop('street')),
//     safeHead,
//     prop('addresses'),
// );


// const t = streetName({ addresses: [] });

// const s = streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] });

// console.log(t, s);

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) => Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is ${balance}`;

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(
    maybe('No money', remainingBalance),
    // map(remainingBalance),
    withdraw(20)
);

const q = getTwenty({ balance: 200 });
const r = getTwenty({ balance: 10 });

console.log(q, r);