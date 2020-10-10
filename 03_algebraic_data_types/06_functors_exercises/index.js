const { add, compose, map, prop, head, append } = require('./utils');

// Exercise 1
//  Use `add` and `map` to a make a function that increments a value inside a functor

class Identity {
    constructor(x) {
        this.$value = x;
    };

    static of(x) {
        return new Identity(x);
    }

    map(fn) {
        return Identity.of(fn(this.$value));
    }

    inspect() {
        return `Identity(${this.$value})`;
    }
}

// // incrF :: Functor f => f Int -> f Int
const incrementFunctor = compose(map(add(1)), Identity.of);
const t = incrementFunctor(2);
console.log(t.inspect());

// Exercise 2
// Use `safeProp` and `head` to find the first initila of the user

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

const user = { id: 2, name: 'Albert', active: true };

const safeProp = (field) => compose(map(prop(field)), Maybe.of)

const initial = compose(map(head), safeProp('name'));

const s = initial(user);

console.log(s.inspect());

// Exercise 3
// Write a function that uses `checkActive` and `showWelcome` to grant access or return an error.

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${this.$value})`;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${this.$value})`;
    }
}

const left = (x) => new Left(x);

// showWelcome :: User -> String
const showWelcome = compose(append('Welcome '), prop('name'));

// checkActive :: User -> Either String User
const checkActive = (user) => user.active ? Either.of(user) : left('Your account is not active');

// eitherWelcome :: User -> Either String String
const eitherWelcome = compose(map(showWelcome), checkActive);

const _usr = { ...user, active: false };

const w = eitherWelcome(_usr);

console.log(w.inspect());

// Exercise 4

// Write a function `validateName` which checks whether a user has a name longer than 3 characters or return an error message. 
// Then use `either`, `showWelcome` and `save` to write a `register` function to signup and welcome a user when the validation is ok. 
// Remember either's two arguments must return the same type.

class IO {
    static of(x) {
        return new IO(() => x);
    }

    constructor(fn) {
        this.$value = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.$value));
    }

    inspect() {
        return `IO(${this.$value})`;
    }

    eval() {
        return `IO(${this.$value()})`;
    }
}

// Note: Use either to resolve this exercise

/*
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }

  return g(e.$value);
});
*/

// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(_ => user));

// save :: User -> IO User
const save = user => new IO(() => ({ ...user, saved: true }));

const maybeUser = compose(prop('name'), Maybe.of);

const validateName = (user) => {
    if (maybeUser(user).isNothing) {
        return left('not valid user props')
    }

    if (!maybeUser(user).isNothing) {
        return user.name.length > 3 ? Either.of(user) : left('user name too short');
    }
};