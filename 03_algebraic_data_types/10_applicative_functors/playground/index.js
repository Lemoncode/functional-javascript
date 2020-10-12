const { add, map } = require('../../../utils/operators');
const Maybe = require('../../../utils/algebraic_support/maybe');

class Container {
    constructor(x) {
        this.$value = x;
    }

    static of(x) {
        return new Container(x);
    }
}

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
    return Container.of(f(this.$value));
}

Container.prototype.join = function() {
    return this.$value;
}

Container.prototype.chain = function(fn) {
    return this.map(fn).join();
}

Container.prototype.ap = function (otherContainer) {
    return otherContainer.map(this.$value);
}

// const t = add(Container.of(2), Container.of(3));

// console.log(t);

// const containerOfAdd2 = map(add, Container.of(2))

// console.log(containerOfAdd2);

// const s = Container.of(2).chain((two) => Container.of(3).map(add(two)));
// console.log(s);

const x = Container.of(add(2)).ap(Container.of(3));

const y = Container.of(2).map(add).ap(Container.of(3));

console.log(x, y);