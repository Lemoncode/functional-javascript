class Identity {
    constructor(x) {
        this.$value = x;
    }

    static of(x) {
        return new Identity(x);
    }
    // (a -> b) -> Identity a -> Identity b
    map(f) {
        return Container.of(f(this.$value));
    }

    join() {
        return this.$value;
    }

    chain(fn) {
        return this.map(fn).join();
    }

    ap(otherContainer) {
        return otherContainer.map(this.$value);
    }
}

module.exports.Identity = Identity; 