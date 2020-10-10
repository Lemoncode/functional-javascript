const moment = require('moment');
const { prop, curry, compose, concat, add, map } = require('../../../utils/operators');

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
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

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${this.$value})`;
    }
}

const left = x => new Left(x);

// const t = Either.of('rain').map(str => `b${str}`);

// const s = left('rain').map(str => `It's gonna ${str}, better bring your umbrealla!`);

// const q = Either.of({ host: 'localhost', port: 80 }).map(prop('host'));

// const u = left('rolls eyes...').map(prop('host'));

// console.log(t, s, q, u);

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate).format('YYYY-MM-DD');
    
    return moment(birthDate).isValid() ?
        Either.of(now.diff(birthDate, 'years')) : 
        left('Birth data could not be parsed');
});

// const t = getAge(moment(), { birthDate: '2005-12-12' });
// const s = getAge(moment(), { birthDate: 'Jly 4, 2001' });

// console.log(t, s);

const toString = (t) => t.toString();

// incAge :: Number -> String;
const incAge = compose(
    concat('If you survive, you will be '),
    toString,
    add(1)
);

// const futureAge = compose(
//     map(console.log),
//     map(incAge),
//     getAge(moment())
// );

// futureAge({ birthDate: '2005-12-12' });

// futureAge({ birthDate: 'Not valid date' });

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
    let result;
  
    switch (e.constructor.name) {
      case 'Left':
        result = f(e.$value);
        break;
  
      case 'Right':
        result = g(e.$value);
        break;
  
      // No Default
    }
  
    return result;
  });

const id = x => x;

const futureAge = compose(
    console.log,
    either(id, incAge),
    getAge(moment()),
);

futureAge({ birthDate: '2005-12-12' });

futureAge({ birthDate: 'Not valid date' });