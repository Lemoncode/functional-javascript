const memoize = (f) => {
    const cache = {};

    return (...args) => {
        const argStr = JSON.stringify(args);
        if (!cache[argStr]) {
            console.log(`Not cached value ${argStr}`);
            cache[argStr] = cache[argStr] || f(...args);
        }
        return cache[argStr];
    }
}

module.exports = memoize;