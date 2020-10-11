const { map, append, compose } = require('../../../utils/operators');

class Container {
    constructor(x) {
        this.$value = x;
    }

    static of(x) {
        return new Container(x);
    }

    map(f) {
        return Container.of(f(this.$value));
    }
}

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

// const id = x => x;

// const idLaw1 = map(id);
// const idLaw2 = id;

// const t = idLaw1(Container.of(2));
// const s = idLaw2(Container.of(2));

// console.log(t, s);

// const compLaw1 = compose(
//     map(append(' world')),
//     map(append(' cruel '))
// );

// const compLaw2 = map(
//     compose(
//         append(' world'),
//         append(' cruel '),
//     ));

// const r = compLaw1(Container.of('Goodbye'));
// const q = compLaw2(Container.of('Goodbye'));

// console.log(r, q);