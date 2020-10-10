const { curry, prop } = require('../../../utils/operators');

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

// const x = Container.of(3);

// const y = Container.of('hotdoogs');

// const z = Container.of(Container.of({ name: 'guarrito' }));

// console.log(x, y, z);

const concat = curry((what, s) => `${s}${what}`);

const x = Container.of(2).map(two => two + 2);
const y = Container.of('bazinga').map(s => s.toUpperCase());
const z = Container.of('tirar').map(concat(' dado')).map(prop('length'));

console.log(x, y, z);